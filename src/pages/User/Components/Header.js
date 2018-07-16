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
      userLoggedIn : sessionStorage["user"] ? true : false,
    }
    this.openLoginModal = this.openLoginModal.bind(this);
    this.changeUserStatus = this.changeUserStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  openLoginModal(){
    window.scroll(0,0);
    this.setState({
      showLoginModal: true,
      showRegisterModal: false,
    });
  }
  
  changeUserStatus(){
    this.setState({
      userLoggedIn:true,
    });
  }

  handleLogout(){
    sessionStorage.removeItem('user');
    this.setState({
      userLoggedIn:false,
      showLoginModal:false,
    });
  }

  openRegisterModal = () => {
    this.setState({
      showLoginModal: false,
      showRegisterModal: true,
    });
  }

  renderLoginButton = () => {
    return (<button type="button" className="btn btn-outline-light btn-sm" onClick={this.openLoginModal} >Login / Sign Up</button>);
  }

  renderUserButton = () => {
    return (
      <div>
        <a className="btn btn-outline-light btn-sm mr-2" href="/profile" >Welcome, User</a>
        <button type="button" className="btn btn-outline-light btn-sm" onClick={this.handleLogout}>Logout</button>
      </div>
    ); 
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top header-color">
          <a className="navbar-brand" href="/">
              <img src={logo} height="30" alt="abc"/>
          </a>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            {!this.props.hideprofile && this.state.userLoggedIn && this.renderUserButton()}
            {!this.props.hideprofile && !this.state.userLoggedIn && this.renderLoginButton()}
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
