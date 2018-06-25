import React, { Component } from 'react';
import logo from '../../../img/airtel-logo_opt.png';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginModal:false,
      showRegisterModal:false,
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white border-bottom border border-light">
          <a className="navbar-brand" href="/">
              <img src={logo} height="30" alt="abc"/>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/admin">All challenges</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/newchallenge">New challenge</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/submissions">Submissions</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
