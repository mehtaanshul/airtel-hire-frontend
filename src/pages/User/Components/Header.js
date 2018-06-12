import React, { Component } from 'react';
import logo from '../../../img/airtel-logo_opt.png';
import profile from '../../../img/outline-person_outline-24px.svg';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border border-light">
        <a className="navbar-brand" href="#">
            <img src={logo} height="30" alt="abc"/>
        </a>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
              	<img  src={profile} height="30" alt="abc"/>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
