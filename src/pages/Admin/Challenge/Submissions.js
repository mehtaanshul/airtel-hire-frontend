import React, { Component } from 'react';
import Header from '../Components/Header';
import RatingModal from '../Components/RatingModal';

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems:[],
      cid:'',
      problemId:'',
      submissions:[],
      showModal:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showRatingModal = this.showRatingModal.bind(this);
  }


  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state); 
  }

  componentDidMount() {
    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    var cid = params.get('cid');

    let fetchurl = 'http://192.168.1.26:8080/problems/'+cid;
    
    fetch(fetchurl)
        .then(res => res.json())
        .then((result) => {
          console.log("problems",result);
          this.setState({
            problems:result,
            cid:cid,
          });
        }, (error) => {
            console.log(error);
    });
  }

  onSubmit(pid){

      let url = 'http://192.168.1.26:8080/allsubmissions/'+pid;

      fetch(url)
        .then(res => res.json())
        .then((result) => {
          console.log("submissions",result);
          this.setState({
            submissions:result,
          });
        }, (error) => {
            console.log(error);
    });
  }

  showRatingModal(uid){
    this.setState({
      userId: uid,
      showModal:true,
    });
  }



  render() {
    return (
      <div className="complete-body">
        <Header/>
        <div className="container mt-4">
          <div className="col-lg-6">
            <select onChange={this.handleChange} name="problemId" value={this.state.problemId} className="custom-select">
              <option selected>Select problem to view submission lisit</option>
              {this.state.problems.map((problem)=> (
                <option key={problem.pid} value={problem.pid}>{problem.probname}</option>  
              ))}
            </select>
          </div>
          <div className="col-lg-2 mt-4">
            <button type="button" onClick={() => this.onSubmit(this.state.problemId)} className="btn btn-info btn-block">Submit</button>
          </div>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">User name</th>
                <th scope="col"></th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.submissions.map((submission,index)=>{
                return(
                  <tr key={index} >
                    <th>{submission.uid}</th>
                    <td>{submission.uname}</td>
                    <td> <button type="button" className="btn btn-outline-info btn-sm">Download solution</button> </td>
                    <td> {submission.score === null ? (<button type="button" onClick={() => this.showRatingModal(submission.uid)} className="btn btn-info btn-sm">Rate</button>) : submission.score } </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <RatingModal userId={this.state.userId} challengeId={this.state.cid} problemId={this.state.problemId} show={this.state.showModal}></RatingModal>
      </div>
    );
  }
}

export default Submissions;
