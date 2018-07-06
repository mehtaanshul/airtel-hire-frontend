import React, { Component } from 'react';
import logo from '../../../img/logo.png';
import login from '../../../img/outline-person_outline-24px.svg';
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLoginModal:false,
      showRegisterModal:false,
      reRender:false,
    }
    this.openLoginModal = this.openLoginModal.bind(this);
    this.changeUserStatus = this.changeUserStatus.bind(this);
  }

  openLoginModal(){
    this.setState({
      showLoginModal: true,
      showRegisterModal: false,
    });
  }

  openRegisterModal = () => {
    this.setState({
      showLoginModal: false,
      showRegisterModal: true,
    });
    {console.log(this.state.showRegisterModal)}
  }

  renderLoginButton = () => {
    return (<button type="button" className="btn btn-outline-light btn-sm" onClick={this.openLoginModal} >Login / Sign Up</button>);
  }

  renderUserButton = () => {
    return (<a className="btn btn-outline-light btn-sm" href="/profile" >Welcome, User</a>); 
  }
  changeUserStatus(){
    this.setState({
      reRender:true,
    });
  }

  render() {

    let userLoggedIn = sessionStorage["user"] ? true : false;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top header-color">
          <a className="navbar-brand" href="/">
              <img src={logo} height="30" alt="abc"/>
          </a>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            {userLoggedIn && this.renderUserButton()}
            {!userLoggedIn && this.renderLoginButton()}
          </div>
        </nav>
        <LoginModal 
          show={this.state.showLoginModal}  
          openRegisterModal={this.openRegisterModal} 
          changeUserStatus={this.changeUserStatus} />
        <RegisterModal show={this.state.showRegisterModal} changeUserStatus={this.changeUserStatus} />
      </div>
    );
  }
}

export default Header;
