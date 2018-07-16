import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';
import { Redirect } from 'react-router';
import BASE_URL from '../../../config.js';

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions:[],
      questionnaires:[],
      questionnaireId:'notselected',
      loading:true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
    this.onSubmit();
  }

  componentDidMount(){
    
    let furl = BASE_URL+'/allQuestionnaires';
    fetch(furl)
      .then(res => res.json())
      .then((result) => {
        console.log("Questionnaires",result);
        this.setState({
          questionnaires:result,
          loading:false,
        });
        }, (error) => {
          console.log(error);
      });

    const url = new URL(document.URL);
    const params =  new URLSearchParams(url.search.slice(1));
    const questionnaireid = params.get('questionnaireid');
    if(questionnaireid){
      this.state["questionnaireId"] = questionnaireid;
      this.setState(this.state);
      console.log(this.state.questionnaireId);
      this.onSubmit();
    }
  }

  onSubmit(){
    
    this.setState({
      loading:true
    })

    let url = BASE_URL+'/QuestionnaireSubmissions/'+this.state.questionnaireId;

    fetch(url)
      .then(res => res.json())
      .then((result) => {
        console.log("Submissions",result);
        this.setState({
          submissions:result,
          loading:false
        });
        }, (error) => {
          console.log(error);
      });
  }

  renderSubmissionsTable(){
    if(this.state.submissions.length){
      return(
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">User name</th>
              <th scope="col">Score</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.submissions.map((submission,index)=>{
              return(
                <tr key={index} >
                  <th>{submission.uid}</th>
                  <td>{submission.uname}</td>
                  <td> {submission.score}</td>
                  <td> 
                    { submission.isfinal ? "Final Score" :
                      (<a 
                      href={"/admin/questionnaire/submission?questionnaireid="+this.state.questionnaireId+"&uid="+submission.uid} 
                      className="btn btn-outline-info btn-sm"
                      >
                      Evaluate
                      </a>)
                    } 
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    else {
      return(
        <h5 className="mt-4"> No Submissions Yet</h5>
      );
    }
    
  }


  render() {

    if(!sessionStorage['admin']){
      return <Redirect to='/admin/login/' />
    }

    if(this.state.loading){
      return (
        <div>
        <Header/>
          <div className="loader-svg">
            <img src={loader}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="complete-body">
          <Header/>
          <div className="container mt-4">
            <div className="col-lg-6">
              <select 
                onChange={this.handleChange} 
                name="questionnaireId" 
                value={this.state.questionnaireId} 
                className="custom-select"
              >
                <option value ="notselected" defaultValue>Select questionnaire to view submission list</option>
                {this.state.questionnaires.map((questionnaire)=> (
                  <option key={questionnaire.questionnaireid} value={questionnaire.questionnaireid}>{questionnaire.qname}</option>  
                ))}
              </select>
            </div>
            {this.state.questionnaireid === "notselected" ? "" : this.renderSubmissionsTable()}
          </div>
        </div>
      );
    }
  }
}

export default Submissions;
