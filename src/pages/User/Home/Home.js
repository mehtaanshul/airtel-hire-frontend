import React, { Component } from 'react';
import Header from '../Components/Header';
import Card from '../Components/Card';
import sample from '../../../img/sample.png';

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
    /*const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    const id = params.get('id');*/

    let url = 'http://192.168.1.26:8081/getdetails'
    //console.log("here");
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
    /*const challenges = [
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
    ];*/

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
          <h3 >Hackathons, Programming Challenges & Coding Competitions</h3>
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
      </div>
    );
  }
}

export default Home;
