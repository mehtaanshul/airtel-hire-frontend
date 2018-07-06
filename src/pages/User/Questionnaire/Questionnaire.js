import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';
import MCQ from './MCQ';
import TrueFalse from './TrueFalse';
import Subjective from './Subjective';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      questions:[],
      answers:[],
      showAlert:false,
      submitting:false
    };
    this.setAnswer = this.setAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){

    const url = new URL(document.URL);
    const params =  new URLSearchParams(url.search.slice(1));
    const questionnaireid = params.get('id');

    let furl = 'http://192.168.1.26:8080/questionnaires/'+questionnaireid;
    
    fetch(furl)
        .then(res => res.json())
        .then((result) => {
          console.log("questions",result);
          this.setState({
            questions:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  onSubmit(){

    this.setState({
      submitting:true
    });

    let url = 'http://192.168.1.26:8080/submissionFromQuestionnaire';

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify(this.state.answers)
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


  setAnswer(index, qid, answer){
    
    let user = sessionStorage['user'];
    const url = new URL(document.URL);
    const params =  new URLSearchParams(url.search.slice(1));
    const questionnaireid = params.get('id');

    this.state.answers[index] = {
      id:user['uid'],
      qid:qid,  //Question ID
      questionnaireid:questionnaireid, //Questionnaire ID
      answer:answer,
    }
    this.setState(this.state);
  }

  renderQuestionnaire(){
    return(
      <div className="container mt-4 text-left">
        {this.state.questions.map(
          (question,index) => {
            if(question.type === "mcq"){
              return (<MCQ key={index} data={question} index={index} onSelect={this.setAnswer} />);
            }
            else if(question.type === "subjective"){
              return (<Subjective key={index} data={question} index={index} onSelect={this.setAnswer} />);
            }
            if(question.type === "truefalse"){
              return (<TrueFalse key={index} data={question} index={index} onSelect={this.setAnswer} />);
            }
          }
        )}            
        <div className="row">
          <div className="col-lg-3 questionnaire-button">
            <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
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

    else{
      return (
        <div className="complete-body">
          <Header/>
          {this.renderQuestionnaire()}
        </div>
      );
    }
  }
}




export default Questionnaire;
