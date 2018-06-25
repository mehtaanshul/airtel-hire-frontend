import React, { Component } from 'react';

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:this.props.show,
      fullname:'',
      email:'',
      phone_number:'',
      password:'',
    };
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }

  onSubmit(){

    let url = 'http://192.168.1.26:8080/register' ;

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          "uname": this.state.fullname,
          "phone_number": this.state.phone_number,
          "emailid": this.state.email,
          "password": this.state.password,
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res['status']==='success'){
            let user = {
              uid: res['id'],
              fullname: this.state.fullname,
            }
            sessionStorage.setItem("user",JSON.stringify(user));
            //this.props.changeUserStatus();
            window.location.reload();
            this.setState({
              showModal:false,
            });
            
          }
        }, (error)=>{
            console.log(error);
        });

  }

  renderModal() {
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
                <label className="float-left label-text">Full Name</label>
                <input type="text" className="form-control form-input" name="fullname" value={this.state.fullname} onChange={this.handleChange} placeholder="Enter full name"/>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Phone Number</label>
                <input type="number" className="form-control form-input" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} placeholder="Enter phone number"/>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Email Address</label>
                <input type="email" className="form-control form-input" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email"/>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Create Password</label>
                <input type="password" className="form-control form-input" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </div>
            </div>
            <div className="offset-md-1 col-md-10">
              <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">Register</button>
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
