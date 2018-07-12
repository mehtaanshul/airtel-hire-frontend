import React, { Component } from 'react';
import Header from '../Components/Header';

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions:[],
      marks:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
    const url = new URL(document.URL);
    const params =  new URLSearchParams(url.search.slice(1));
    const questionnaireid = params.get('questionnaireid');
    const uid = params.get('uid');

    let fetchurl = 'http://192.168.1.26:8080/subjective/'+uid+'/'+questionnaireid;
    fetch(fetchurl)
      .then(res => res.json())
      .then((result) => {
        console.log("submissions",result);
        this.setState({
          submissions:result,
        });
        }, (error) => {
          console.log(error);
      });
  }

  handleChange(e,qid,index){
    const url = new URL(document.URL);
    const params =  new URLSearchParams(url.search.slice(1));
    const uid = params.get('uid');

    this.state.marks[index] = {
      score:e.target.value,
      qid:qid,
      id:uid
    }
    this.setState(this.state);
  }

  onSubmit(){
    console.log(JSON.stringify(this.state.marks));

    let url = 'http://192.168.1.26:8080/scoreOfSubjective';

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify(this.state.marks)
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"] === "success"){
            console.log("Submission Success");
            this.props.history.push('/admin/questionnaire/submissions');
          }
        }, (error)=>{
            console.log(error);
        });
  }


  render() {
    return (
      <div className="complete-body">
        <Header/>
        <div className="container mt-4">
         <h4 className="text-left">Questionnaire Name</h4>
         <hr/>
         { this.state.submissions.map((submission,index)=> 
            <div className="mt-4" key={submission.qid}>
              <div className="row mt-4">
               <div className="text-left col-md-8">
                 <strong>{(index+1)+". "}{submission.qstatement}</strong><br/>
                 <label className="float-left"> Total Marks : {" "+submission.marks}</label>
               </div>
              </div>
              <div className="row">
               <div className="text-left col-md-8">
                 {submission.answer}
               </div>
              </div>
              <div className="row mt-2">
               <div className="text-left col-md-3">
                <input 
                  type="text" 
                  className="form-control" 
                  onChange={(e) => this.handleChange(e,submission.qid,index)} 
                  value={this.state.marks[index] ? this.state.marks[index]['score'] : ''} 
                  placeholder="Enter marks"/>
               </div>
              </div>
            </div>
          )}
         <div className="row mt-4">
          <div className="col-md-3">
            <button type="button" onClick={this.onSubmit} className="btn btn-info btn-block float-left">Submit</button>
          </div>
         </div>
        </div>
      </div>
    );
  }
}

export default Submission;
