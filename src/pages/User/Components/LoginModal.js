import React, { Component } from 'react';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:this.props.show,
      emailid:'',
      password:'',
      loginerror:'',
      formErrors:{

      },
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  
  onRegister = () => {
    this.props.openRegisterModal();
  }

  onSubmit(e){

    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }

    let url = 'http://192.168.1.5:8080/login' ;

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          "emailid": this.state.emailid,
          "password": this.state.password,
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          console.log('login',res);
          if(res['status']==='success'){
            let user = {
              uid: res['id'],
              type:res['type'],
            }
            sessionStorage.setItem("user",JSON.stringify(user));
            window.location.reload();
            this.setState({
              showModal:false,
            });
          }
          else {
            this.setState({
              loginerror:'Invalid email or wrong password.'
            })
          }
        }, (error)=>{
            console.log(error);
        });

  }

  validateForm(){

    let requiredCheckFields = ["emailid", "password"];

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

    if(!this.validateEmail(this.state['emailid'])){
      this.state.formErrors['emailid'] = 'Invalid email';
    }else{
      delete this.state.formErrors['emailid'];
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

  renderCloseButton(){
    return (
      <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }

  renderModal(){
    return (
      <div>
        <div className="login-modal">
        </div>
        <div className="login-form">
          {this.renderCloseButton()}
          <form className="mb-5 mt-5">
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Email Address</label>
                <input type="email" name="emailid" onChange={this.handleChange} value={this.state.email} className="form-control form-input" placeholder="Enter email"/>
                <small>{this.state.formErrors['emailid']}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="offset-md-1 col-md-10">
                <label className="float-left label-text">Password</label>
                <input type="password" name="password" onChange={this.handleChange} value={this.state.password} className="form-control form-input" placeholder="Password" />
                <small>{this.state.formErrors['password']}</small>
              </div>
            </div>
            <div className="offset-md-1 col-md-10">
              <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">Login</button>
              <small>{this.state.loginerror}</small>
              <hr/>
              <label className="label-text"> Don't have an account</label>
              <button type="button"  onClick={this.onRegister} disabled={this.props.isQuestionnaire ? "disabled" : ""} className="btn btn-primary btn-block">Create Account</button>
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
