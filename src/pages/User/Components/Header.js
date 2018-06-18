import React, { Component } from 'react';
import logo from '../../../img/airtel-logo_opt.png';
import login from '../../../img/outline-person_outline-24px.svg';
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginModal:false,
    }
    this.openLoginModal = this.openLoginModal.bind(this);
  }

  openLoginModal(){
    this.setState({
      showLoginModal: true,
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border border-light">
          <a className="navbar-brand" href="/">
              <img src={logo} height="30" alt="abc"/>
          </a>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">
                	<img  src={login} onClick={this.openLoginModal} height="30" alt="abc"/>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <LoginModal show={this.state.showLoginModal} />
        <RegisterModal show={false} />
      </div>
    );
  }
}

export default Header;
