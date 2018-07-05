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
    };
    this.setAnswer = this.setAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){

    let url = 'http://192.168.1.26:8080/questionnaires/2'
    
    fetch(url)
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
    console.log(this.state.answers);
  }

  setAnswer(index, qid, answer,type){
    this.state.answers[index] = {
      id:29,
      type:type,
      qid:qid,
      answer:answer,
    }
    this.setState(this.state);
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
          <Header />
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
        </div>
      );
    }
  }
}




export default Questionnaire;
