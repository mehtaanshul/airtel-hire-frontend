import React, { Component } from 'react';
import Header from '../Components/Header';
import sample from '../../../img/banner.gif';
import { Link } from "react-router-dom";
import loader from '../../../img/loader.svg';
import BASE_URL from '../../../config.js';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeDetails:{

      },
      loading:true,
    };
  }

  componentDidMount() {
    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    const cid = params.get('cid');

    let fetchurl = BASE_URL+'/challenges/'+cid;
    
    fetch(fetchurl)
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          console.log("result fetch");
          this.setState({ 
            challengeDetails:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  componentDidUpdate(){
    if(!this.state.loading){
    document.getElementById('aboutChallenge').innerHTML = this.state.challengeDetails.aboutChallenge;
    document.getElementById('guidelines').innerHTML = this.state.challengeDetails.guidelines;
    document.getElementById('faqs').innerHTML = this.state.challengeDetails.aboutChallenge;
    document.getElementById('prizes').innerHTML = this.state.challengeDetails.prizes;
    }
  }

  renderLive(){
    return(
      <div className="col-lg-3 float-right">
        <Link to={'/problems?cid='+this.state.challengeDetails.cid} className="btn btn-success btn-block">Start Now</Link>
      </div>
    );
  }

  renderLogin(){
    return(
      <div className="col-lg-3 float-right">
        <button onClick={() => { this.child.openLoginModal(); }} className="btn btn-success btn-block">Start Now</button>
      </div>
    );
  }

  renderRegister(){
    return(
      <div className="col-lg-3 float-right">
        <button className="btn btn-outline-info btn-block" disabled>Upcoming</button>
      </div>
    );
  }

  renderPrevious(){

    return(
      <div className="col-lg-3 float-right">
        <button href="#" className="btn btn-secondary btn-block" disabled>Ended</button>
      </div>
    );
  }

  render() {

    console.log("render");
    
    let user = JSON.parse(sessionStorage.getItem("user"));

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
          <Header ref={instance => { this.child = instance; }} />
          <img src={BASE_URL+'/img/'+this.state.challengeDetails.cid} className="w-100" alt=""/>
          <div className="jumbotron text-left">
          {this.state.challengeDetails.category == 'live' && user && this.renderLive()}
          {this.state.challengeDetails.category == 'live' && !user && this.renderLogin()}
          {this.state.challengeDetails.category == 'upcoming' && this.renderRegister()}
          {this.state.challengeDetails.category == 'previous' && this.renderPrevious()}
            <div className="col-lg-8">
              <h5>About the Challenge</h5>
              <div id="aboutChallenge"></div>
              <hr/>
              <h5>Guidelines</h5>
              <div id="guidelines"></div>
              <hr/>
              <h5>Prizes</h5>
              <div id="prizes"></div>
              <hr/>
              <h5>FAQs</h5>
              <div id="faqs"></div>
              <hr/>
            </div>
          </div>  
        </div>
      );
    }
  }
}

export default Challenge;
