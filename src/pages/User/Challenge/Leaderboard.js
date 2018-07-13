import React, { Component } from 'react';
import Header from '../Components/Header';
import { Redirect } from 'react-router';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard:[],
      userid:null,
    };
  }
  
  componentDidMount() {
    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const cid = params.get('cid');

    if(sessionStorage['user']){
      let user = JSON.parse(sessionStorage.getItem('user'));
      let furl = 'http://192.168.1.5:8080/score/'+cid;
      fetch(furl)
          .then(res => res.json())
          .then((result) => {
            console.log(result);
            this.setState({
              leaderboard:result,
              userid:user["uid"]
            });
          }, (error) => {
              console.log(error);
      });
    }
  }

  render() {

    if(!sessionStorage['user']){
      return <Redirect to='/' />
    }

    return (
      <div className="complete-body">
        <Header />
        <div className="text-left problems-heading bg-light p-4 mb-4">
          <h1>Airtel Crack the Code</h1>
          <small className="text-secondary">Apr 15, 2018, 09:00 AM IST - Jun 14, 2018, 11:55 PM IST</small>
        </div>
        <div className="row p-4">
          <div className="col-lg-8">
            <a href="/problems" className="btn btn-info float-right">All Problems</a>
            <h4 className="text-left problem-title">Leaderboard</h4>
            <div className="list-group w-100 mt-3">
              <div className="list-group-item list-group-item-action">
                <small className="float-left"><strong>PROGRAMMERS</strong></small>
                <small className="float-right"><strong>SCORE</strong></small>
              </div>
              {this.state.leaderboard.map((user,index)=>{
              if(user.uid===this.state.userid){
                return(
                  <a href="#" className="list-group-item list-group-item-action text-left bg-light">
                    {index+1}.&nbsp; <strong>{user.uname}</strong>
                    <div className="float-right">{user.score}</div>
                  </a>
                );
              }})}
              {this.state.leaderboard.map((user,index)=>{
              if(user.uid!=this.state.userid){
                return(
                  <a href="#" className="list-group-item list-group-item-action text-left">
                    {index+1}.&nbsp; <strong>{user.uname}</strong>
                    <div className="float-right">{user.score}</div>
                  </a>
                );
              }})}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
