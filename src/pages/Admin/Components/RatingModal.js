import React, { Component } from 'react';

class RatingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:this.props.show,
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
  

  onSubmit(){

    let url = 'http://192.168.1.26:8080/login' ;

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
          if(res['status']==='success'){
            let user = {
              uid: res['id'],
            }
            sessionStorage.setItem("user",JSON.stringify(user));
            //this.props.changeUserStatus();
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

  renderModal(){
    return (
      <div>
        <div className="rating-modal">
        </div>
        <div className="rating-modal-body">
          <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="form-group mt-4">
            <div className="offset-md-1 col-md-10">
              <label className="float-left label-text">Score</label>
              <input type="number" name="score" onChange={this.handleChange} value={this.state.score} className="form-control form-input" placeholder="Enter score"/>
            </div>
          </div>
          <div className="offset-md-1 col-md-10 mb-4">
            <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">Submit score</button>
          </div>
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

export default RatingModal;
