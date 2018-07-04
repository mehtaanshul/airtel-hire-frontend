import React, { Component } from 'react';
import Header from '../Components/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount:'',
      questions:[
        {
          questionType:'',
          questionStatement:'',
          questionOptions:[],
        }
      ],
      showAlert:false,
      showModal:true,
      submitting:false,
      formErrors:{

      },
    };
    this.addQuestion = this.addQuestion.bind(this);
  }

  handleTypeChange(e, index){
    this.state["questions"][index][e.target.name] = e.target.value;
    this.setState(this.state);
  }

  handleOptionsChange(e,index,i){
    this.state.questions[index]["questionOptions"][i] = e.target.value;
    this.setState(this.state);
  }

  addQuestion(){
    let questions = this.state.questions; 
    
    questions.push(
      {
        questionType:'Type',
        questionStatement:'',
        questionOptions:[],
      }
    );

    this.setState({questions:questions});
  }

  addOption(index){
    let questions = this.state.questions;
    questions[index]["questionOptions"].push('');
    this.setState({questions});
  }

  renderOptions(index){
    let items = [];
    for(let i=0;i<this.state.questions[index]["questionOptions"].length;i++){
      items.push(
        <input type="text" name="questionOptions" class="form-control" onChange={(e) => this.handleOptionsChange(e,index,i)} value={this.state.questions[index]["questionOptions"][i]}/>
      );
    }
    return items;
  }

  renderQuestions(){
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    var modules = {
      toolbar: toolbarOptions
    };

    let items = [];

    for (let i = 0; i < this.state.questions.length; i++) {
      items.push(
        <div key={i}>
          <div className="row">
            <div className="col-md-3">
              <label className="float-left" >Question Type</label>
              <select value={this.state.questions[i]["questionType"]} name="questionType" onChange={(e) => this.handleTypeChange(e,i)} className="custom-select">
                  <option>Type</option>
                  <option value="subjective">Subjective</option>
                  <option value="mcq">MCQ</option>
                  <option value="truefalse">True/False</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <label className="float-left">Question Statement</label>
              <textarea name="questionStatement" className="form-control" rows="3"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {this.renderOptions(i)}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button type="button" onClick={() => this.addOption(i)} class="btn btn-info">Add a option</button>
            </div>
          </div>
        </div>
      );
    }
    return items;
  }

  render() {
    return (
      <div className="complete-body">
        <Header />
        <div className="container mt-4">
          <h4 className="text-left">Create Questionnaire</h4>
          <hr/>
          {this.renderQuestions()}
          <div className="row mt-4 ml-2">
            <button type="button" onClick={this.addQuestion} className="btn btn-info">Add a question</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Questionnaire;
