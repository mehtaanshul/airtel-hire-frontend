import React, { Component } from 'react';
import Header from '../Components/Header';

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions:[],
      questionnaires:[],
      questionnaireId:'',
    };
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
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
    
    let url = 'http://192.168.1.26:8080/QuestionnairesSubmissions/'+this.state.questionnaireId;

    fetch(url)
      .then(res => res.json())
      .then((result) => {
        console.log("Submissions",result);
        this.setState({
          submissions:result,
        });
        }, (error) => {
          console.log(error);
      });
  }


  render() {
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
              <option selected>Select questionnaire to view submission list</option>
              {this.state.questionnaires.map((questionnaire)=> (
                <option key={questionnaire.pid} value={questionnaire.pid}>{questionnaire.probname}</option>  
              ))}
            </select>
          </div>
          <div className="col-lg-2 mt-4">
            <button type="button" onClick={this.onSubmit} className="btn btn-info btn-block">Submit</button>
          </div>
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
                    <td> <a href="#" className="btn btn-outline-info btn-sm">Evaluate</a> </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Submissions;
