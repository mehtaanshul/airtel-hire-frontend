import React, { Component } from 'react';
import Header from '../Components/Header';

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      college:'',
      degree:'',
      year:'',
      specialization:'',
      phone:'',
    };
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
                <input type="text" value={this.state.name} class="form-control" placeholder="Enter name"/>
              </div>
              <div className="col-lg-6 mt-2">
                <label className="float-left">Email</label>
                <input type="email" value={this.state.email} class="form-control" placeholder="Enter email"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Phone</label>
                <input type="number" value={this.state.phone} class="form-control" placeholder="Enter number"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">College</label>
                <input type="text"value={this.state.college} class="form-control" placeholder="College"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Degree</label>
                <input type="text" value={this.state.degree} class="form-control" placeholder="Degree"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Specialization</label>
                <input type="text" value={this.state.specialization} class="form-control" placeholder="Enter branch"/>
              </div>
              <div className="col-lg-6 mt-4">
                <label className="float-left">Year</label>
                <input type="number" value={this.state.year} class="form-control" placeholder="Year of graduation"/>
              </div>
            </div>
            <div className="row">
              <div class="col-lg-6 mt-4">
                  <label className="float-left">Upload Resume</label>
                  <input type="file" class="form-control-file"/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 mt-4">
                  <button type="button" class="btn btn-info btn-block float-left">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
