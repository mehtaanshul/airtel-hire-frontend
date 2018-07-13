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
      formErrors:{

      },
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

  onSubmit(e){

    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }

    let url = 'http://192.168.1.5:8080/register' ;

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

  validateForm(){

    let requiredCheckFields = ["email", "password","fullname","phone_number"];

    let field;

    for(let i=0;i<requiredCheckFields.length; i++){

      field = requiredCheckFields[i];

      if(this.state[field].trim().length === 0){
        this.state.formErrors[field] = 'Please enter ' + field;
        }else{
        delete this.state.formErrors[field];
      }
    }

    if(Object.keys(this.state.formErrors).length > 0){
      this.setState(this.state);
      return;
    }

    if(!this.validateEmail(this.state['email'])){
      this.state.formErrors['email'] = 'Invalid email';
    }else{
      delete this.state.formErrors['email'];
    }

    if(!this.validatePhoneNumber(this.state['phone_number'])){
      this.state.formErrors['phone_number'] = 'Invalid phone number';
    }else{
      delete this.state.formErrors['phone_number'];
    }

    if(this.state['password'].trim().length < 8){
      this.state.formErrors['password'] = 'Password length should be greater than 8';
    }else{
      delete this.state.formErrors['password'];
    }

    this.setState(this.state);

  }

   validateEmail(mail){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }

  validatePhoneNumber(number){
    return /^\d{10}$/.test(number);
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
                <small>{this.state.formErrors['fullname']}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Phone Number</label>
                <input type="number" className="form-control form-input" name="phone_number" value={this.state.phone_number} onChange={this.handleChange} placeholder="Enter phone number"/>
                <small>{this.state.formErrors['phone_number']}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Email Address</label>
                <input type="email" className="form-control form-input" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email"/>
                <small>{this.state.formErrors['email']}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Create Password</label>
                <input type="password" className="form-control form-input" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                <small>{this.state.formErrors['password']}</small>
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
