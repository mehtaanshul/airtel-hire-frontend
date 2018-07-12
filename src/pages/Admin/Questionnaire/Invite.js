import React, { Component } from 'react';
import Header from '../Components/Header';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaires:[],
      questionnaireId:'',
      email:'',
      name:'',
      showAlert:false,
      submitting:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }

  hideAlert(){
    this.setState({showAlert:false});
  }

  renderAlert(){
    return(
      <div className="alert alert-primary mt-4" role="alert">
        <button onClick={this.hideAlert} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Invitation sent successfully!
      </div>
    );
  }

  componentDidMount(){
    
    let url = 'http://192.168.1.26:8080/allQuestionnaires';
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        console.log("Questionnaires",result);
        this.setState({
          questionnaires:result,
        });
        }, (error) => {
          console.log(error);
      });
  }

  onSubmit(){
    this.setState({
      submitting:true
    })
    let url = 'http://192.168.1.26:8080/sendmail';
    let link = 'http://localhost:3000/questionnaire/login?id='+this.state.questionnaireId;
    
    const formdata = new FormData();
    formdata.append('uname',this.state.name);
    formdata.append('emailid',this.state.email);
    formdata.append('link',link);

    fetch(url,{
         method: 'post',
         body:formdata
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"] === "success"){
            this.setState({
              submitting:false,
              showAlert:true,
            })
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
          {this.state.showAlert && this.renderAlert()}
          <div className="row">
            <div className="col-lg-6">
              <label className="float-left">Questionnaire</label>
              <select 
                onChange={this.handleChange} 
                name="questionnaireId" 
                value={this.state.questionnaireId} 
                className="custom-select"
              >
                <option defaultValue>Select questionnaire</option>
                {this.state.questionnaires.map((questionnaire)=> (
                  <option key={questionnaire.questionnaireid} value={questionnaire.questionnaireid}>{questionnaire.qname}</option>  
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <label className="float-left">Full name</label>
              <input type="text" name="name" onChange={this.handleChange} className="form-control" placeholder="Enter Full name" value={this.state.name}/>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <label className="float-left">Email</label>
              <input type="text" name="email" onChange={this.handleChange} className="form-control" placeholder="Enter email" value={this.state.email}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mt-4">
              <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">{this.state.submitting ? "Inviting..." : "Invite"}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Invite;
