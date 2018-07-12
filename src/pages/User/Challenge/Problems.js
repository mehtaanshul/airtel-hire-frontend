import React, { Component } from 'react';
import Header from '../Components/Header';
import { Link } from "react-router-dom";
import loader from '../../../img/loader.svg';

class Problems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems:[],
      cid:'',
      loading:true,
    };
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
          console.log(result);
          this.setState({
            problems:result,
            cid:cid,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  render() {

    let problems = this.state.problems.map((problem) => 
      <Link to={'/problem?pid='+problem.pid} className="list-group-item list-group-item-action">{problem.probname}</Link> 
    );
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
          <Header />
          <div className="text-left problems-heading bg-light p-4 mb-4">
            <h1>Airtel Crack the Code</h1>
            <small className="text-secondary">Apr 15, 2018, 09:00 AM IST - Jun 14, 2018, 11:55 PM IST</small>
          </div>
          <div className="col-lg-8">
            <a href={'/leaderboard?cid='+this.state.cid}className="btn btn-info float-right mb-1">Leaderboard</a>
            <Link to={'/challenge?cid='+this.state.cid} className="btn btn-info float-right mb-1 mr-2">About Challenge</Link>
            <h4 className="text-left">Problems</h4>
            <div className="list-group text-left w-100 problems-list">
            {problems.length ? problems : "No Problems added"}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Problems;
