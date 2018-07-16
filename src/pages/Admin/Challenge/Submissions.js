import React, { Component } from 'react';
import Header from '../Components/Header';
import RatingModal from '../Components/RatingModal';
import loader from '../../../img/loader.svg';
import { Redirect } from 'react-router';
import BASE_URL from '../../../config.js';

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems:[],
      cid:'',
      problemId:'notselected',
      submissions:[],
      showModal:false,
      loading:true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showRatingModal = this.showRatingModal.bind(this);
  }


  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
    this.onSubmit(); 
  }

  componentDidMount() {
    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    var cid = params.get('cid');

    let fetchurl = BASE_URL+'/problems/'+cid;
    
    fetch(fetchurl)
        .then(res => res.json())
        .then((result) => {
          console.log("problems",result);
          this.setState({
            problems:result,
            cid:cid,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  onSubmit(){

      let url = BASE_URL+'/allsubmissions/'+this.state.problemId;
      this.setState({
        loading:true,
      })
      fetch(url)
        .then(res => res.json())
        .then((result) => {
          console.log("submissions",result);
          this.setState({
              showModal:false,
              submissions:result,
              loading:false,
            });
        }, (error) => {
            console.log(error);
    });
  }

  downloadFile(uid){
    let url=BASE_URL+'/file/'+uid+'/'+this.state.problemId;
    window.open(url, '_blank');
  }

  showRatingModal(uid){
    this.setState({
      userId: uid,
      showModal:true,
    });
  }

  renderSubmissionsTable(){
    if(this.state.submissions.length){
      return(
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
                  <td> <button type="button" onClick={() => this.downloadFile(submission.uid)} className="btn btn-outline-info btn-sm">Download solution</button> </td>
                  <td> {submission.score === null ? (<button type="button" onClick={() => this.showRatingModal(submission.uid)} className="btn btn-info btn-sm">Rate</button>) : submission.score } </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    else {
      return(
        <h5 className="mt-4"> No Submissions Yet</h5>
      );
    }
    
  }


  render() {

    if(!sessionStorage['admin']){
      return <Redirect to='/admin/login/' />
    }

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
    else {
      return (
        <div className="complete-body">
          <Header/>
          <div className="container mt-4">
            <div className="col-lg-6">
              <select onChange={this.handleChange} name="problemId" value={this.state.problemId} className="custom-select">
                <option value="notselected" defaultValue>Select problem to view submission lisit</option>
                {this.state.problems.map((problem)=> (
                  <option key={problem.pid} value={problem.pid}>{problem.probname}</option>  
                ))}
              </select>
            </div>
            {this.state.problemId === "notselected" ? "" : this.renderSubmissionsTable()}
          </div>
          <RatingModal onModalClose={this.onSubmit} userId={this.state.userId} challengeId={this.state.cid} problemId={this.state.problemId} show={this.state.showModal}></RatingModal>
        </div>
      );  
    } 
  }
}

export default Submissions;
