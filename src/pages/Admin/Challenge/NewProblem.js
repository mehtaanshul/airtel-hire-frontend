import React, { Component } from 'react';
import Header from '../Components/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect } from 'react-router';
import BASE_URL from '../../../config.js';

class NewProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutProblem: '',
      problemName:'',
      cid:'',
      showAlert:false,
      submitting:false,
      challenges:[],
      challengeId:'',
      formErrors:{

      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleAboutProblemChange = this.handleAboutProblemChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let url = BASE_URL+'/challenges';
    fetch(url)
        .then(res => res.json())
        .then((result) => {
          this.setState({
            challenges:result,
          });
        }, (error) => {
            console.log(error);
    });
  }

  handleAboutProblemChange(value) {
    this.setState({ aboutProblem: value })
  }

  handleChange(e){
    console.log(e.target);
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
    console.log(this.state.challengeId);
  }
  hideAlert(){
    this.setState({showAlert:false});
  }

  renderAlert(){
    return(
      <div class="alert alert-primary mt-4" role="alert">
        <button onClick={this.hideAlert} type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Problem added successfully!
      </div>
    );
  }

  onSubmit(e){

    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }

    this.setState({
      submitting:true
    });

    let url = BASE_URL+'/problems';

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          probdetails: this.state.aboutProblem,
          probname:this.state.problemName,
          owner:'',
          cid:this.state.challengeId,
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"] === "success"){
            this.setState({
              submitting:false,
              aboutProblem: '',
              problemName:'',
              cid:'',
              showAlert:true,
            })
          }
        }, (error)=>{
            console.log(error);
        });
}

  validateForm(){

    let requiredCheckFields = ["challengeId", "aboutProblem","problemName"];

    let field;

    for(let i=0;i<requiredCheckFields.length; i++){

      field = requiredCheckFields[i];

      if(this.state[field].trim().length === 0){
        this.state.formErrors[field] = true;
      }
      else {
        delete this.state.formErrors[field];
      }
    }

    if(Object.keys(this.state.formErrors).length > 0){
      this.setState(this.state);
      return;
    }

  }

  render() {

    if(!sessionStorage['admin']){
      return <Redirect to='/admin/login/' />
    }

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

    return (
      <div className="complete-body">
        <Header />
        <div className="container">
          {this.state.showAlert && this.renderAlert()}
          <h4 className="mt-4 text-left">Add a new problem</h4>
          <hr/>
          <div className="col-md-6 mt-4 mb-4">
            <select value={this.state.challengeId} name="challengeId" onChange={this.handleChange} className="custom-select">
              <option defaultValue>Select challenge to add a problem</option>
              {this.state.challenges.map((challenge,index)=>(
                <option key={"opt-"+index} value={challenge.cid}>{challenge.cname}</option>
                ))}
            </select>
            <small>{this.state.formErrors['challengeId'] && "Please select a challenge"}</small>
          </div>
          <div className="col-md-5">
            <label className="label-text float-left">Problem Name</label>
            <input type="text" placeholder="Name" name="problemName" value={this.state.problemName} onChange={this.handleChange} className="form-control form-input"/>
            <small>{this.state.formErrors['problemName'] && "Please enter problem name"}</small>
            <label className="label-text float-left mt-4">About problem</label>
            <br/>
            <br/>
          </div>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.aboutProblem} name="aboutProblem" onChange={this.handleAboutProblemChange} />
              <small>{this.state.formErrors['aboutProblem'] && "Please enter problem details"}</small>
          </div>
          <div className="col-md-2">
            <button type="button" onClick={this.onSubmit} className="btn btn-primary btn-block">{this.state.submitting ? "Adding..." : "Add a problem"}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProblem;
