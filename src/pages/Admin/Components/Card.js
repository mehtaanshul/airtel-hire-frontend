import React, { Component } from 'react';
import { Link } from "react-router-dom";
import sample from '../../../img/sample.png';

class Card extends Component {
  renderLive(){
    return(
      <div>
        <small>Started on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <div className="row">
          <div className="col-md-6">
            <a href={'/admin/submissions?cid='+this.props.cid} className="btn btn-success btn-sm btn-block">Submissions</a>
          </div>
          <div className="col-md-6">
            <a href={'/admin/leaderboard?cid='+this.props.cid} className="btn btn-success btn-sm btn-block">Leaderboard</a>
          </div>
        </div>
      </div>
    );
  }

  renderRegister(){
    return(
      <div>
        <small>Starts on</small>
        <p>{this.props.startDate}, {this.props.startTime}</p>
        <a href="/" className="btn btn-outline-info btn-sm" disabled>Upcoming</a>
      </div>
    );
  }

  renderPrevious(){
    return(
      <div>
        <small>Ended on</small>
        <p>{this.props.endDate}, {this.props.endTime}</p>
        <div className="row">
          <div className="col-md-6">
            <a href={'/admin/submissions?cid='+this.props.cid} className="btn btn-success btn-sm btn-block">Submissions</a>
          </div>
          <div className="col-md-6">
            <a href={'/admin/leaderboard?cid='+this.props.cid} className="btn btn-success btn-sm btn-block">Leaderboard</a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="card mb-4">
        <img className="card-img-top" src={'http://192.168.1.5:8080/img/'+this.props.cid} alt=""/>
        <div className="card-body">
          <small>{this.props.type}</small>
          <Link className="link-style" to={'/admin/challenge?cid='+this.props.cid} ><h5 >{this.props.name}</h5></Link>
          {this.props.category === 'live' && this.renderLive()}
          {this.props.category === 'upcoming' && this.renderRegister()}
          {this.props.category === 'previous' && this.renderPrevious()}
        </div>
      </div>
    );
  }
}

export default Card;
