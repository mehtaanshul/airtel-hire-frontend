import React, { Component } from 'react';
import { Redirect } from 'react-router';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){


    let url = 'http://192.168.1.26:8080/adminlogin';

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
          if(res["status"] === "success"){
            sessionStorage['admin'] = JSON.stringify({
              emailid:this.state.email,
              password:this.state.password
            })
            this.props.history.push('/admin');
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

  render() {

    return (
      <div className="admin-login-page">
          <div className="admin-login col-md-4">
            <div className="admin-login-heading row">
            <h3>Sign-in</h3>
            </div>
            <form>
              <div className="row">
                <div class="form-group offset-md-2 col-md-8 mt-2">
                  <input type="email" name="email" value={this.state.email} onChange={this.handleChange} class="form-control" placeholder="Email"/>
                </div>
              </div>
              <div className="row">
                <div class="form-group offset-md-2 col-md-8 mt-2">
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange} class="form-control" placeholder="Password"/>
                </div>
              </div>
              <div className="row">
                <div class="offset-md-2 col-md-8 mt-2">
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
