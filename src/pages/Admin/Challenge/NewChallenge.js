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
      showAlert:false,
      banner:null,
      formErrors:{

      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAboutChallengeChange = this.handleAboutChallengeChange.bind(this);
    this.handlePrizesChange = this.handlePrizesChange.bind(this);
    this.handleFaqsChange = this.handleFaqsChange.bind(this);
    this.handleGuidelinesChange = this.handleGuidelinesChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
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

  hideAlert(){
    this.setState({showAlert:false});
  }

  onSubmit(e){

    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }

    this.setState({submitting:true});

    let url = 'http://192.168.1.5:8080/challenges';

    const formData = new FormData();
    formData.append('banner',this.state.banner);
    formData.append('aboutChallenge',this.state.aboutChallenge);
    formData.append('cname',this.state.challengeName);
    formData.append('startDate',this.state.startDate);
    formData.append('startTime',this.state.startTime);
    formData.append('endDate',this.state.endDate);
    formData.append('endTime',this.state.endTime);
    formData.append('guidelines',this.state.guidelines);
    formData.append('faqs',this.state.faqs);
    formData.append('prizes',this.state.prizes);
    formData.append('type',this.state.type);

    fetch(url,{
         method: 'post',
         body: formData,
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"]==="success"){
            window.scroll(0,0);
            console.log("Challenge Added");
            this.setState({
                showAlert:true,
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

getCurrentDate(){
    let date = new Date();
    let currentDate = date.getFullYear() + '-' + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + '-' + ((date.getDate() < 10) ? "0" : "") + (date.getDate());
    return currentDate;
    //let maxDate = date.getFullYear() + '-' + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + '-' + (((date.getDate()+2) < 10) ? "0" : "") + (date.getDate()+2);
    //let currentTime = ((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes();
  }

validateForm(){

    let requiredCheckFields = ["aboutChallenge", "challengeName","startDate","startTime","endDate","endTime","guidelines","prizes","type","faqs"];

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

    if(this.state.banner === null){
      this.state.formErrors["banner"] = "Please upload challenge banner";
    }

    if(this.state.startDateTemp > this.state.endDateTemp){
      this.state.formErrors["date"] = "Start date should be less than end date";
    }
    else if(this.state.startDateTemp === this.state.endDateTemp && this.state.startTime > this.state.endTime){
     this.state.formErrors["date"] = "Start time should be before end time for same date"; 
    }
    else {
      delete this.state.formErrors["date"]; 
    }

    if(Object.keys(this.state.formErrors).length > 0){
      this.setState(this.state);
      return;
    }

  }

  renderAlert(){
    return(
      <div className="alert alert-primary mt-4" role="alert">
        <button onClick={this.hideAlert} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Challenge added successfully! Now Click on new problem to add problems to this challenge.
      </div>
    );
  }

  onFileChange(e) {

    let type = e.target.files[0].type.split("/");
    if(type[1] && e.target.files[0].size <= 500*1024 && type[1].match(/(jpg|png|JPG|PNG|jpeg|JPEG|gif)/g)){
      this.setState({banner:e.target.files[0]});
       delete this.state.formErrors["banner"];
    }
    else if(e.target.files[0].size > 500*1024) {
      this.state.formErrors["banner"] = "Image size should be less than 500KB";
      this.setState(this.state);
    }
    else {
      this.state.formErrors["banner"] = "Invalid format, make sure you are uploading an image.";
      this.setState(this.state); 
    }
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
          {this.state.showAlert && this.renderAlert()}
            <a href="/admin/newproblem" className="btn btn-info float-right">Add a problem</a>
            <h4 className="mt-4 text-left">Add a new challenge</h4>
          <hr/>
          <div className="col-md-5">
            <label className="label-text float-left">Challenge Name</label>
            <input type="text" placeholder="Name" name="challengeName" value={this.state.challengeName} onChange={this.handleChange} className="form-control form-input"/>
            <small>{this.state.formErrors['challengeName'] && "Please enter challenge name"}</small>
            
            <label className="label-text float-left mt-4">Type</label>
            <input type="text" placeholder="Challenge Type" name="type" value={this.state.type} onChange={this.handleChange} className="form-control form-input"/>
            <small>{this.state.formErrors['type'] && "Please enter challenge type"}</small>

            <div className="row">
              <div className="col-md-8">
                <label className="label-text float-left mt-4">Start date</label>
                <input type="date" min={this.getCurrentDate()} name="startDate" value={this.state.startDateTemp} onChange={this.handleDateChange} className="form-control form-input"/>
                <small>{this.state.formErrors['startDate'] && "Please enter start date"}</small>
              </div>
              <div className="col-md-4">
                <label className="label-text float-left mt-4">Start time</label>
                <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} className="form-control form-input"/>
                <small>{this.state.formErrors['startTime'] && "Please enter start time"}</small>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <label className="label-text float-left mt-4">End date</label>
                <input type="date" min={this.state.startDateTemp} name="endDate" value={this.state.endDateTemp} onChange={this.handleDateChange} className="form-control form-input"/>
                <small>{this.state.formErrors['endDate'] && "Please enter end date"}</small>
              </div>
              <div className="col-md-4">
                <label className="label-text float-left mt-4">End time</label>
                <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} className="form-control form-input"/>
                <small>{this.state.formErrors['endTime'] && "Please enter end time"}</small>
              </div>
            </div>

            <div className="mt-4">
              <div className="form-group text-left">
                <label>Upload Challenge Banner</label>&nbsp;<small>(Resolution recommended : 900px * 300px)</small>
                <input type="file" onChange={this.onFileChange} className="form-control-file"/>
                <small>{this.state.formErrors['banner']}</small>
              </div>
            </div>

          </div>
          <label className="label-text float-left mt-4 ml-3">About challenge</label><br/><br/>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.aboutChallenge} name="aboutChallenge" onChange={this.handleAboutChallengeChange} />
              <small>{this.state.formErrors['aboutChallenge'] && "Please enter challenge details"}</small>
          </div>
          <label className="label-text float-left mt-4 ml-3">Prizes</label><br/><br/>
          <div className="form-group ml-3">
            <ReactQuill theme="snow" modules={modules} value={this.state.prizes} name="prizes" onChange={this.handlePrizesChange} />
            <small>{this.state.formErrors['prizes'] && "Please enter challenge prizes"}</small>
          </div>
          <label className="label-text float-left mt-4 ml-3">Faqs</label><br/><br/>
          <div className="form-group ml-3">
            <ReactQuill theme="snow" modules={modules} value={this.state.faqs} name="faqs" onChange={this.handleFaqsChange} />
            <small>{this.state.formErrors['faqs'] && "Please enter FAQs"}</small>
          </div>
          <label className="label-text float-left mt-4 ml-3">Guidelines</label><br/><br/>
          <div className="form-group ml-3">
            <ReactQuill theme="snow" modules={modules} value={this.state.guidelines} name="guidelines" onChange={this.handleGuidelinesChange} />
            <small>{this.state.formErrors['guidelines'] && "Please enter guidelines"}</small>
          </div>
          <div className="col-md-2 mb-4">
            <button type="button" onClick={this.onSubmit} className="btn btn-primary btn-block">{this.state.submitting ? "Submitting.." : "Submit"}</button>
            <small>{Object.keys(this.state.formErrors).length > 0 && "Please fill all fields"}</small><br/>
            <small>{this.state.formErrors["date"]}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default NewChallenge;
