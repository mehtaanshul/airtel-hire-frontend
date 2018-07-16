import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';
import { Redirect } from 'react-router';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaires:[],
      questionnaireId:'',
      email:'',
      name:'',
      showAlert:false,
      submitting:false,
      loading:true,
      formErrors:{}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }

  hideAlert(){
    this.setState({showAlert:false});
  }

  renderAlert(){
    return(
      <div className="alert alert-primary mt-4" role="alert">
        <button onClick={this.hideAlert} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Invitation sent successfully!
      </div>
    );
  }

  componentDidMount(){
    
    let url = 'http://192.168.1.5:8080/allQuestionnaires';
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        console.log("Questionnaires",result);
        this.setState({
          questionnaires:result,
          loading:false
        });
        }, (error) => {
          console.log(error);
      });
  }

  onSubmit(e){
    
    let emails = (this.state.email.replace(/ /g,'')).split(',');
    
    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }
    
    this.setState({
      submitting:true
    })
    let url = 'http://192.168.1.5:8080/sendmail';
    let link = 'http://localhost:3000/questionnaire/login?id='+this.state.questionnaireId;

    fetch(url,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body:JSON.stringify({
          emails:emails,
          link:link
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"] === "success"){
            this.setState({
              submitting:false,
              showAlert:true,
            })
          }
        }, (error)=>{
            console.log(error);
        });
    
  }

  validateForm(){
    
    let emails = (this.state.email.replace(/ /g,'')).split(',');

    if(this.state["questionnaireId"].trim().length === 0){
      this.state.formErrors["questionnaireId"] = 'Please select a questionnaire';
    }
    else{
      delete this.state.formErrors["questionnaireId"];
    }
    
    const length = emails.length;
    
    for(let i=0;i<length;i++){
      if(!this.validateEmail(emails[i])){
        this.state.formErrors["emailid"] = "Invalid email";
        break;
      }
      else{
        delete this.state.formErrors['emailid'];
      }
    }

    this.setState(this.state);

  }

  validateEmail(mail){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }


  render() {

    if(!sessionStorage['admin']){
      return <Redirect to='/admin/login/' />
    }

    if(this.state.loading){
      return (
        <div>
        <Header/>
          <div className="loader-svg">
            <img src={loader}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="complete-body">
          <Header/>
          <div className="container mt-4">
            {this.state.showAlert && this.renderAlert()}
            <div className="row">
              <div className="col-lg-6">
                <label className="float-left">Questionnaire</label>
                <select 
                  onChange={this.handleChange} 
                  name="questionnaireId" 
                  value={this.state.questionnaireId} 
                  className="custom-select"
                >
                  <option value="" defaultValue>Select questionnaire</option>
                  {this.state.questionnaires.map((questionnaire)=> (
                    <option key={questionnaire.questionnaireid} value={questionnaire.questionnaireid}>{questionnaire.qname}</option>  
                  ))}
                </select>
                <small className="float-left">{this.state.formErrors["questionnaireId"]}</small>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="float-left">Email (Multiple emails separated by comma)</label>
                <input type="text" name="email" onChange={this.handleChange} className="form-control" placeholder="example@gmail.com, abc@gmail.com" value={this.state.email}/>
                <small className="float-left">{this.state.formErrors["emailid"]}</small>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mt-4">
                <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">{this.state.submitting ? "Inviting..." : "Invite"}</button>
              </div>
            </div>
          </div>
        </div>
      ); 
    }
  }
}

export default Invite;
