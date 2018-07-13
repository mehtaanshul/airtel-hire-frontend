import React, { Component } from 'react';
import Header from '../Components/Header';
import { Link } from "react-router-dom";
import loader from '../../../img/loader.svg';

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem:{

      },
      loading:true,
      file:null,
      submitStatus:0,
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    
    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const pid = params.get('pid');

    let fetchurl = 'http://192.168.1.5:8080/problem/'+pid;
    let furl = 'http://192.168.1.5:8080/checksubmissionstatus';

    let user = JSON.parse(sessionStorage.getItem("user"));
    
    fetch(fetchurl)
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          this.setState({
            problem:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });

    fetch(furl,{
         method: 'post',
         headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          id:user["uid"], 
          pid:pid
         })
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"]==="success"){
            //console.log("get status");
            this.setState({
              submitStatus:2,
            });
          }
        }, (error)=>{
            console.log(error);
        });



  }

  onFileChange(e) {
    this.setState({file:e.target.files[0]})
  }

  onSubmit(){

    this.setState({
      submitStatus:1
    })

    let furl = 'http://192.168.1.5:8080/submission';

    let user = JSON.parse(sessionStorage.getItem("user"));

    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    const pid = params.get('pid');

    const formData = new FormData();
    formData.append('file',this.state.file);
    formData.append('id',user["uid"]);
    formData.append('pid',pid);
    //console.log("Uploading file");

    fetch(furl,{
         method: 'post',
         body: formData,
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res["status"]==="success"){
            console.log("Submiited");
            this.setState({
              submitStatus:2,
            });
          }
        }, (error)=>{
            console.log(error);
        });

  }

  renderUpload(){
    return(
      <div className="form-group text-left">
        <label>Upload Solution</label>
        <input type="file" onChange={this.onFileChange} className="form-control-file"/>
      </div>
    );
  }

  render() {

    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    const pid = params.get('pid');
    
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
          <Header />
          <div className="text-left problems-heading bg-light p-4 mb-4">
            <h1>{this.state.problem.probname}</h1>
            <small className="text-secondary">Apr 15, 2018, 09:00 AM IST - Jun 14, 2018, 11:55 PM IST</small>
          </div>
          <div className="row p-4">
            <div className="col-lg-8">
             {/* <a href={"/leaderboard?pid="+pid} class="btn btn-info float-right mb-1">Leaderboard</a>*/}
              <Link to={'/problems?cid='+this.state.problem.cid} className="btn btn-info float-right mr-2">All Problems</Link>
              <h4 className="text-left problem-title">{this.state.problem.probname}</h4>
              <hr/>
              <div className="text-left">
                <h4>Problem Statement</h4>
                {this.state.problem.probdetails}
              </div>
            </div>
            <div className="col-lg-4">
              <form>
                {this.state.submitStatus === 0 && this.renderUpload()}
                <button type="button" onClick={this.onSubmit} 
                  disabled={this.state.submitStatus ? "disabled" : ""}
                  className={this.state.submitStatus ? "btn btn-secondary float-left" : "btn btn-success float-left"}>
                  {!this.state.submitStatus ? "Submit" : ""}
                  {this.state.submitStatus === 1 ? "Submitting..." : ""}
                  {this.state.submitStatus === 2 ? "Submitted" : ""}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Problem;
