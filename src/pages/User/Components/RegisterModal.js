import React, { Component } from 'react';

class RegisterModal extends Component {
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
                <label className="float-left label-text">Full Name</label>
                <input type="text" class="form-control form-input" placeholder="Enter full name"/>
              </div>
            </div>
            <div class="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Phone Number</label>
                <input type="number" class="form-control form-input" placeholder="Enter phone number"/>
              </div>
            </div>
            <div class="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Email Address</label>
                <input type="email" class="form-control form-input" placeholder="Enter email"/>
              </div>
            </div>
            <div class="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Create Password</label>
                <input type="password" class="form-control form-input" placeholder="Password" />
              </div>
            </div>
            <div className="offset-md-1 col-md-10">
              <button type="button" class="btn btn-success btn-block">Register</button>
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

export default RegisterModal;
