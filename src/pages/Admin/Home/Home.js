import React, { Component } from 'react';
import Header from '../Components/Header';
import Card from '../Components/Card';
import sample from '../../../img/sample.png';
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesCategory:'all',
      challenges:[],
    };
  }

   handleChange = (event) => {
    this.setState({challengesCategory: event.target.value});
  }

  componentDidMount() {

    let url = 'http://192.168.1.26:8080/challenges'
    
    fetch(url)
        .then(res => res.json())
        .then((result) => {
          //console.log("result");
          //console.log(result);
          this.setState({
            challenges:result,
          });
        }, (error) => {
            console.log(error);
    });
  }

  render() {
    
    let filteredChallenges = this.state.challenges.filter(
      (challenge) => {
          if (this.state.challengesCategory == 'all') {
            return challenge;
          } 
          else {
            return challenge.category.toLowerCase().indexOf(
              this.state.challengesCategory.toLowerCase()) !== -1;
          }
        }
      );
    let cards = filteredChallenges.map((challenge) => 
      <div className="col-lg-3">
        <Card
        name={challenge.cname}
        type={challenge.type}
        category={challenge.category}
        startTime={challenge.startTime}
        endTime={challenge.endTime}
        startDate={challenge.startDate}
        endDate={challenge.endDate} 
        />
      </div> 
    );

    return (
      <div className="complete-body">
        <Header />
        <div className="bg-light p-4">
          <h3 >All Challenges</h3>
          <div className="container mt-4">
            <form>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <select value={this.state.challengesCategory} onChange={this.handleChange} className="form-control">
                      <option value="all" >All</option>
                      <option value="live" >Live</option>
                      <option value="upcoming" >Upcoming</option>
                      <option value="previous" >Previous</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <Link to={"/newchallenge"} className="btn btn-outline-success btn-block">Add a new Challenge</Link>
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              {cards}
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default Home;
