import React, { Component } from 'react';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:this.props.show,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal:nextProps.show,
    });
  }

  closeModal(){
    this.setState({
      showModal:false,
    });
  }
  onRegister = () => {
    this.props.openRegisterModal();
  }

  renderModal(){
    return (
      <div>
        <div className="login-modal">
        </div>
        <div className="login-form">
          <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <form className="mb-5 mt-5">
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Email Address</label>
                <input type="email" className="form-control form-input" placeholder="Enter email"/>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Password</label>
                <input type="password" className="form-control form-input" placeholder="Password" />
              </div>
            </div>
            <div className="offset-md-1 col-md-10">
              <button type="submit" className="btn btn-success btn-block">Login</button>
              <hr/>
              <label className="label-text"> Don't have an account</label>
              <button type="button"  onClick={this.onRegister} className="btn btn-primary btn-block">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
      {this.state.showModal && this.renderModal()}
      </div>
    );
  }
}

export default LoginModal;
