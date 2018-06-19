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
                    <button className="btn btn-outline-success btn-block">Add a new Challenge</button>
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
