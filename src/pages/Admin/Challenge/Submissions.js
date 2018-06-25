import React, { Component } from 'react';
import Header from '../Components/Header';
import RatingModal from '../Components/RatingModal';

class NewChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state); 
  }


  render() {
    return (
      <div className="complete-body">
        <Header/>
        <div className="container mt-4">
          <div className="col-lg-6">
            <select class="custom-select">
              <option selected>Select problem to view submission lisit</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2 mt-4">
            <button type="button" className="btn btn-info btn-block">Submit</button>
          </div>
          <table class="table mt-4">
            <thead>
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Problem name</th>
                <th scope="col">User name</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td> <button type="button" class="btn btn-outline-info btn-sm">Download solution</button> </td>
                <td> <button type="button" class="btn btn-info btn-sm">Rate</button> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <RatingModal show={true}></RatingModal>
      </div>
    );
  }
}

export default NewChallenge;
