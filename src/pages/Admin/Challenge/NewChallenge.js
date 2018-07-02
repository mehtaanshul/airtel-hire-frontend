import React, { Component } from 'react';
import Header from '../Components/Header';
import Card from '../Components/Card';
import sample from '../../../img/sample.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class NewChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting:false,
      aboutChallenge: '',
      challengeName:'',
      startDate:'',
      startDateTemp:'',
      startTime:'',
      endDate:'',
      endDateTemp:'',
      endTime:'',
      guidelines:'',
      prizes:'',
      faqs:'',
      type:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAboutChallengeChange = this.handleAboutChallengeChange.bind(this);
    this.handlePrizesChange = this.handlePrizesChange.bind(this);
    this.handleFaqsChange = this.handleFaqsChange.bind(this);
    this.handleGuidelinesChange = this.handleGuidelinesChange.bind(this);
  }

  handleAboutChallengeChange(value) {
    this.setState({ aboutChallenge: value })
  }

  handlePrizesChange(value) {
    this.setState({ prizes: value })
  }

  handleFaqsChange(value) {
    this.setState({ faqs: value })
  }
  handleGuidelinesChange(value) {
    this.setState({ guidelines: value })
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state); 
  }
  handleDateChange(e){
    
    let date = e.target.value;
    let arr = date.split("-");
    date = arr[2]+"-"+arr[1]+"-"+arr[0];

    this.state[e.target.name+"Temp"] = e.target.value;
    this.state[e.target.name] = date;
    this.setState(this.state); 
  }

  onSubmit(){

    this.setState({submitting:true});

    let url = 'http://192.168.1.26:8080/challenges';

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          aboutChallenge: this.state.aboutChallenge,
          cname:this.state.challengeName,
          startDate:this.state.startDate,
          startTime:this.state.startTime,
          endDate:this.state.endDate,
          endTime:this.state.endTime,
          guidelines:this.state.guidelines,
          prizes:this.state.prizes,
          faqs:this.state.faqs,
          type:this.state.type,
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"] === "success"){
            this.setState({
              submitting:false,
              aboutChallenge: '',
              challengeName:'',
              startDate:'',
              startDateTemp:'',
              startTime:'',
              endDate:'',
              endDateTemp:'',
              endTime:'',
              guidelines:'',
              prizes:'',
              faqs:'',
              type:'',
            })
          }
        }, (error)=>{
            console.log(error);
        });
}


  render() {

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
          <h4 className="mt-4 text-left">Add a new challenge</h4>
          <hr/>
          <div className="col-md-5">
            <label className="label-text float-left">Challenge Name</label>
            <input type="text" placeholder="Name" name="challengeName" value={this.state.challengeName} onChange={this.handleChange} className="form-control form-input"/>
            <div className="row">
              <div className="col-md-8">
                <label className="label-text float-left mt-4">Start date</label>
                <input type="date" name="startDate" value={this.state.startDateTemp} onChange={this.handleDateChange} className="form-control form-input"/>
              </div>
              <div className="col-md-4">
                <label className="label-text float-left mt-4">Start time</label>
                <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} className="form-control form-input"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <label className="label-text float-left mt-4">End date</label>
                <input type="date" name="endDate" value={this.state.endDateTemp} onChange={this.handleDateChange} className="form-control form-input"/>
              </div>
              <div className="col-md-4">
                <label className="label-text float-left mt-4">End time</label>
                <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} className="form-control form-input"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="custom-file mt-4">
                  <input type="file" className="custom-file-input"/>
                  <label className="custom-file-label">Choose file</label>
                </div>
              </div>
              <div className="col-md-4">
                <button type="button" className="btn btn-info btn-block mt-4">Upload</button>
              </div>
            </div>

          </div>
          <label className="label-text float-left mt-4 ml-3">About challenge</label><br/><br/>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.aboutChallenge} name="aboutChallenge" onChange={this.handleAboutChallengeChange} />
          </div>
          <label className="label-text float-left mt-4 ml-3">Prizes</label><br/><br/>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.prizes} name="prizes" onChange={this.handlePrizesChange} />
          </div>
          <label className="label-text float-left mt-4 ml-3">Faqs</label><br/><br/>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.faqs} name="faqs" onChange={this.handleFaqsChange} />
          </div>
          <label className="label-text float-left mt-4 ml-3">Guidelines</label><br/><br/>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.guidelines} name="guidelines" onChange={this.handleGuidelinesChange} />
          </div>
          <div className="col-md-2 mb-4">
            <button type="button" onClick={this.onSubmit} className="btn btn-primary btn-block">{this.state.submitting ? "Submitting.." : "Submit"}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewChallenge;
