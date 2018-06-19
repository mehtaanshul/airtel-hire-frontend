import React, { Component } from 'react';
import Header from '../Components/Header';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

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
              <a href="#" className="list-group-item list-group-item-action text-left bg-light">
                15.&nbsp; <strong>This User</strong>
                <div className="float-right">08.20</div>
              </a>
              <a href="#" className="list-group-item list-group-item-action text-left">
                1.&nbsp; <strong>Dapibus ac facilisis in</strong>
                <div className="float-right">20.36</div>
              </a>
              <a href="#" className="list-group-item list-group-item-action text-left">
                2.&nbsp; <strong>Morbi leo risus</strong>
                <div className="float-right">11.36</div>
              </a>
              <a href="#" className="list-group-item list-group-item-action text-left">
                3.&nbsp; <strong>Porta ac consectetur ac</strong>
                <div className="float-right">25.14</div>
              </a>
              <a href="#" className="list-group-item list-group-item-action text-left">
                4.&nbsp; <strong>Vestibulum at eros</strong>
                <div className="float-right">14.20</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
