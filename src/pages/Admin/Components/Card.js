import React, { Component } from 'react';
import { Link } from "react-router-dom";
import sample from '../../../img/sample.png';

class Card extends Component {
  renderLive(){
    return(
      <div>
        <small>Started on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <a href="/problems" className="btn btn-success btn-sm">Start Now</a>
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
    return (
      <div className="card mb-4">
        <img className="card-img-top" src={sample} alt=""/>
        <div className="card-body">
          <small>{this.props.type}</small>
          <Link className="link-style" to="/challenge"><h5 >{this.props.name}</h5></Link>
          {this.props.category === 'live' && this.renderLive()}
          {this.props.category === 'upcoming' && this.renderRegister()}
          {this.props.category === 'previous' && this.renderPrevious()}
        </div>
      </div>
    );
  }
}

export default Card;
