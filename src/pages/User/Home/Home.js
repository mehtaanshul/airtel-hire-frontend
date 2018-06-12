import React, { Component } from 'react';
import Header from '../Components/Header';
import Card from '../Components/Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesCategory:'all',
    };
  }

   handleChange = (event) => {
    this.setState({challengesCategory: event.target.value});
  }
  render() {
    const challenges = [
      {
        "id":"1",
        "name":"Airtel Crack",
        "startDate":"16 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Hackathon",
        "category":"upcoming",
      },
      {
        "id":"2",
        "name":"Airtel Hackathon",
        "startDate":"10 June",
        "endDate":"15 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Machine Learning",
        "category":"live",
      },
      {
        "id":"3",
        "name":"Hack Society",
        "startDate":"05 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Competitive",
        "category":"live",
      },
      {
        "id":"4",
        "name":"Airtel Hack",
        "startDate":"05 June",
        "endDate":"09 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Blockchain",
        "category":"previous",
      },
      {
        "id":"5",
        "name":"Crack the code",
        "startDate":"16 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Machine Learning",
        "category":"upcoming",
      },
      {
        "id":"6",
        "name":"Airtel Code-in",
        "startDate":"08 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"React JS",
        "category":"live",
      },
      {
        "id":"7",
        "name":"Airtel Hiring Challenge",
        "startDate":"10 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Competitive",
        "category":"live",
      },
      {
        "id":"8",
        "name":"Thapar Hackathon",
        "startDate":"16 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Machine Learning",
        "category":"upcoming",
      },
    ];

    let filteredChallenges = challenges.filter(
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
        name={challenge.name}
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
      <div>
        <Header />
        <h2 className="mt-4">Hackathons, Programming Challenges & Coding Competitions</h2>
        
        <div className="container mt-4">
          <form>
            <div className="row">
              <div className="col-lg-3">
                <div className="form-group">
                  <select value={this.state.challengesCategory} onChange={this.handleChange} className="form-control">
                    <option value="all" >All</option>
                    <option value="live" >Live</option>
                    <option value="upcoming" >Upcoming</option>
                    <option value="previous" >Previous</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            {cards}
          </div>
        </div>  
      </div>
    );
  }
}

export default Home;
