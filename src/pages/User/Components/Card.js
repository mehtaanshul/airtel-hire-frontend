import React, { Component } from 'react';
import { Link } from "react-router-dom";
import sample from '../../../img/sample.png';

class Card extends Component {
  renderLive(){
    return(
      <div>
        <small>Started on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <Link to={'/problems?cid='+this.props.cid} className="btn btn-success btn-sm">Start Now</Link>
      </div>
    );
  }

  renderLogin(){
    return(
      <div>
        <small>Started on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <button onClick={this.props.login} className="btn btn-success btn-sm">Start Now</button>
      </div>
    );
  }

  renderRegister(){
    return(
      <div>
        <small>Starts on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <button className="btn btn-outline-info btn-sm" disabled>Upcoming</button>
      </div>
    );
  }

  renderPrevious(){
    return(
      <div>
      <small>Ended on</small>
      <p>{this.props.endDate}, {this.props.endTime}</p>
      <button href="#" className="btn btn-secondary btn-sm" disabled>Ended</button>
      </div>
    );
  }

  render() {

    let user = JSON.parse(sessionStorage.getItem("user"));

    return (
      <div className="card mb-4">
        <img className="card-img-top" src={'http://192.168.1.5:8080/img/'+this.props.cid} alt="Card"/>
        <div className="card-body">
          <small>{this.props.type}</small>
          <Link className="link-style" to={'/challenge?cid='+this.props.cid}><h5 >{this.props.name}</h5></Link>
          {this.props.category === 'live' && user && this.renderLive()}
          {this.props.category === 'live' && !user && this.renderLogin()}
          {this.props.category === 'upcoming' && this.renderRegister()}
          {this.props.category === 'previous' && this.renderPrevious()}
        </div>
      </div>
    );
  }
}

export default Card;
