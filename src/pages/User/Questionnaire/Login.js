import React, { Component } from 'react';
import logo from '../../../img/logo.png';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
      formErrors:{

      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){

    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }


    let url = 'http://192.168.1.5:8080/login';

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          emailid:this.state.email,
          password:this.state.password
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"] === "success" && res['type'] === "questionnaire" ){
            
            let user = {
              uid: res['id'],
              type:res['type'],
            }
            sessionStorage.setItem("user",JSON.stringify(user));
            
            const url = new URL(document.URL);
		        const params = new URLSearchParams(url.search.slice(1));
		        const id = params.get('id');
            let redirectUrl = '/questionnaire?id='+id;
            this.props.history.push(redirectUrl);
          }
          else {
            this.setState({
              error:'Invalid email or password',
            });
          }
        }, (error)=>{
            console.log(error);
        });
}
  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }

  validateForm(){

    let requiredCheckFields = ["email", "password"];

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

  render() {

    return (
      <div className="admin-login-page">
          <div className="admin-login col-md-4">
            <div className="admin-login-heading row">
            	<img src={logo} height="30" alt="abc"/>
            </div>
            <form>
              <div className="row">
                <div class="form-group offset-md-1 col-md-10 mt-2">
                  <input type="email" name="email" value={this.state.email} onChange={this.handleChange} class="form-control" placeholder="Email"/>
                   <small>{this.state.formErrors['email']}</small>
                </div>
              </div>
              <div className="row">
                <div class="form-group offset-md-1 col-md-10 mt-2">
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange} class="form-control" placeholder="Password"/>
                   <small>{this.state.formErrors['password']}</small>
                </div>
              </div>
              <div className="row">
                <div class="offset-md-1 col-md-10 mt-2">
                  <button type="button"  onClick={this.onSubmit} class="btn btn-primary btn-block admin-login-button">Login</button>
                  <small>{this.state.error}</small>
                </div>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;
