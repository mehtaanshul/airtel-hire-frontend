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
    //console.log("next props ", nextProps);
  }

  closeModal(){
    this.setState({
      showModal:false,
    });
  }

  renderModal(){
    return (
      <div>
        <div className="login-modal">
        </div>
        <div className="login-form">
          <button type="button" class="close" onClick={this.closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <form className="mb-5 mt-5">
            <div class="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Email Address</label>
                <input type="email" class="form-control form-input" placeholder="Enter email"/>
              </div>
            </div>
            <div class="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Password</label>
                <input type="password" class="form-control form-input" placeholder="Password" />
              </div>
            </div>
            <div className="offset-md-1 col-md-10">
              <button type="submit" class="btn btn-success btn-block">Login</button>
              <hr/>
              <label className="label-text"> Don't have an account</label>
              <button type="button" class="btn btn-primary btn-block">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state.showModal);

    return (
      <div>
      {this.state.showModal && this.renderModal()}
      </div>
    );
  }
}

export default LoginModal;
