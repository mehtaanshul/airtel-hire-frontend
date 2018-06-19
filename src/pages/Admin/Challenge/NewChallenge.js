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
      aboutChallenge: '',
      challengeName:'',
      startDate:'',
      startTime:'',
      endDate:'',
      endTime:'',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleAboutChallengeChange(value) {
    this.setState({ aboutChallenge: value })
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state); 
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
                <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} className="form-control form-input"/>
              </div>
              <div className="col-md-4">
                <label className="label-text float-left mt-4">Start time</label>
                <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} className="form-control form-input"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <label className="label-text float-left mt-4">End date</label>
                <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} className="form-control form-input"/>
              </div>
              <div className="col-md-4">
                <label className="label-text float-left mt-4">End time</label>
                <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} className="form-control form-input"/>
              </div>
            </div>
            <label className="label-text float-left mt-4">About challenge</label>
            <br/>
            <br/>
          </div>
          <div className="form-group ml-3">
              <ReactQuill theme="snow" modules={modules} value={this.state.aboutChallenge} onChange={this.handleAboutChallengeChange} />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary btn-block">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewChallenge;
