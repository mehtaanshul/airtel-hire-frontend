import React, { Component } from 'react';
import Header from '../Components/Header';

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
        uname:'',
        emailid:'',
        collegename:'',
        degree:'',
        year:'',
        specialization:'',
        phone_number:'',
        resume:null,
      },
        profileUpdated:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  componentDidMount() {

    let user = JSON.parse(sessionStorage.getItem("user"));
    let url = 'http://192.168.1.5:8080/users/'+user["uid"];
    
    fetch(url)
        .then(res => res.json())
        .then((result) => {
          this.setState({
            user:result,
          });
        }, (error) => {
            console.log(error);
    });
  }

  handleChange(e){
    this.state["user"][e.target.name] = e.target.value;
    this.setState(this.state);
    if(this.state.profileUpdated) this.setState({profileUpdated:false});
  }

  onFileChange(e) {
    this.state["user"]["resume"] = e.target.files[0];
    this.setState(this.state);
    if(this.state.profileUpdated) this.setState({profileUpdated:false});
  }

  onSubmit(){

    let user = JSON.parse(sessionStorage.getItem("user"));
    let url = 'http://192.168.1.5:8080/update/'+user["uid"];

    const formData = new FormData();

    formData.append('collegename',this.state.user.collegename);
    formData.append('degree',this.state.user.degree);
    formData.append('specialization',this.state.user.specialization);
    formData.append('year',this.state.user.year);
    formData.append('resume',this.state.user.resume);

    fetch(url,{
         method: 'post',
         body: formData
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res['status']==='success'){
            this.setState({profileUpdated:true});
          }
        }, (error)=>{
            console.log(error);
        });
  }

  render() {

    return (
      <div className="complete-body">
        <Header />
        <div className="container-fluid mt-4">
          <div className="col-lg-8">
            <h4 className="float-left">Profile</h4>
            <br/>
            <hr/>
            <div className="row">
              <div className="col-lg-6 mt-2">
                <label className="float-left">Full Name</label>
                <input type="text" value={this.state.user.uname} className="form-control" name="uname"  onChange={this.handleChange} placeholder="Enter name" readOnly/>
              </div>
              <div className="col-lg-6 mt-2">
                <label className="float-left">Email</label>
                <input type="email" value={this.state.user.emailid} className="form-control" name="emailid" onChange={this.handleChange} placeholder="Enter email" readOnly/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Phone</label>
                <input type="number" value={this.state.user.phone_number} className="form-control" name="phone_number" onChange={this.handleChange} placeholder="Enter number" readOnly/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">College</label>
                <input type="text"value={this.state.user.collegename} className="form-control" name="collegename" onChange={this.handleChange} placeholder="College"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Degree</label>
                <input type="text" value={this.state.user.degree} className="form-control" name="degree" onChange={this.handleChange} placeholder="Degree"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Specialization</label>
                <input type="text" value={this.state.user.specialization} className="form-control" name="specialization" onChange={this.handleChange} placeholder="Enter branch"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Year</label>
                <input type="number" value={this.state.user.year} className="form-control" name="year" onChange={this.handleChange} placeholder="Year of graduation"/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mt-4">
                  <label className="float-left">Upload Resume</label>
                  <input type="file" onChange = {this.onFileChange} className="form-control-file"/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 mt-4">
                  <button type="button" className="btn btn-info btn-block float-left" onClick={this.onSubmit} disabled={this.state.profileUpdated}>{this.state.profileUpdated ? "Saved" : "Save Changes"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
