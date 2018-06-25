import React, { Component } from 'react';
import Header from '../Components/Header';
import ThankYou from '../Components/ThankYou';
import { Link } from "react-router-dom";
import loader from '../../../img/loader.svg';

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem:{

      },
      loading:true,
    };
  }

  componentDidMount() {
    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    const pid = params.get('pid');

    let fetchurl = 'http://192.168.1.26:8080/problem/'+pid;
    
    fetch(fetchurl)
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          this.setState({
            problem:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  render() {
    
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
            <h1>{this.state.problem.probname}</h1>
            <small className="text-secondary">Apr 15, 2018, 09:00 AM IST - Jun 14, 2018, 11:55 PM IST</small>
          </div>
          <div className="row p-4">
            <div className="col-lg-8">
              <a href="/leaderboard" class="btn btn-info float-right mb-1">Leaderboard</a>
              <Link to={'/problems?cid='+this.state.problem.cid} className="btn btn-info float-right mr-2">All Problems</Link>
              <h4 className="text-left problem-title">{this.state.problem.probname}</h4>
              <hr/>
              <div className="text-left">
                <h4>Problem Statement</h4>
                {this.state.problem.probdetails}
              </div>
            </div>
            <div className="col-lg-4">
              <form>
                <div className="form-group text-left">
                  <label>Upload Solution</label>
                  <input type="file" class="form-control-file"/>
                </div>
                <button type="button" class="btn btn-success float-left">Submit</button>
              </form>
            </div>
            
          </div>
          <ThankYou show={false}/>
        </div>
      );
    }
  }
}

export default Problem;
