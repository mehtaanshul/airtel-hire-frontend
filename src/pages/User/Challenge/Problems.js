import React, { Component } from 'react';
import Header from '../Components/Header';

class Problems extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div className="font-face">
        <Header />
        <div className="text-left problems-heading bg-light p-4 mb-4">
          <h1>Airtel Crack the Code</h1>
          <small className="text-secondary">Apr 15, 2018, 09:00 AM IST - Jun 14, 2018, 11:55 PM IST</small>
        </div>
        <div className="col-lg-8">
          <button type="button" class="btn btn-info float-right mb-1">Leaderboard</button>
          <a href="/challenge" class="btn btn-info float-right mb-1 mr-2">About Challenge</a>
          <h4 class="text-left">Problems</h4>
          <div class="list-group text-left w-100 problems-list">
            <a href="/problem" class="list-group-item list-group-item-action">Cras justo odio</a>
            <a href="/problem" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
            <a href="/problem" class="list-group-item list-group-item-action">Morbi leo risus</a>
            <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
            <a href="#" class="list-group-item list-group-item-action">Vestibulum at eros</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Problems;
