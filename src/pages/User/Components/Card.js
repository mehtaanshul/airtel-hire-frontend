import React, { Component } from 'react';
import { Link } from "react-router-dom";
import sample from '../../../img/sample.png';

class Card extends Component {
  renderLive(){
    return(
      <div>
        <small>Starts on</small>
        <p>{this.props.endDate}, {this.props.endTime}</p>
        <a href="#" className="btn btn-success">Start Now</a>
      </div>
    );
  }

  renderRegister(){
    return(
      <div>
        <small>Starts on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <a href="#" className="btn btn-outline-info">Register</a>
      </div>
    );
  }

  renderPrevious(){
    return(
      <div>
      <small>Ended on</small>
      <p>{this.props.endDate}, {this.props.endTime}</p>
      <button href="#" className="btn btn-secondary" disabled>Ended</button>
      </div>
    );
  }

  render() {
    return (
      <div className="card mb-4">
        <img className="card-img-top" src={sample} alt="Card image cap"/>
        <div className="card-body">
          <small>{this.props.type}</small>
          <Link className="link-style" to="/challenge"><h5 >{this.props.name}</h5></Link>
          {this.props.category == 'live' && this.renderLive()}
          {this.props.category == 'upcoming' && this.renderRegister()}
          {this.props.category == 'previous' && this.renderPrevious()}
        </div>
      </div>
    );
  }
}

export default Card;
