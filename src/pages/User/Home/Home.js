import React, { Component } from 'react';
import Header from '../Components/Header';
import Card from '../Components/Card';
import sample from '../../../img/sample.png';
import loader from '../../../img/loader.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesCategory:'all',
      challenges:[],
      loading:true,
    };
  }

   handleChange = (event) => {
    this.setState({challengesCategory: event.target.value});
  }

  componentDidMount() {

    let url = 'http://192.168.1.26:8080/challenges';
    fetch(url)
        .then(res => res.json())
        .then((result) => {
          this.setState({
            challenges:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  render() {
    /*const challenges = [
      {
        "cid":"1",
        "cname":"Airtel Crack",
        "startDate":"16 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Hackathon",
        "category":"upcoming",
      },
      {
        "cid":"2",
        "cname":"Airtel Hackathon",
        "startDate":"10 June",
        "endDate":"15 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Machine Learning",
        "category":"live",
      },
      {
        "cid":"3",
        "cname":"Hack Society",
        "startDate":"05 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Competitive",
        "category":"live",
      },
      {
        "cid":"4",
        "cname":"Airtel Hack",
        "startDate":"05 June",
        "endDate":"09 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Blockchain",
        "category":"previous",
      },
      {
        "cid":"5",
        "cname":"Crack the code",
        "startDate":"16 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Machine Learning",
        "category":"upcoming",
      },
      {
        "cid":"6",
        "cname":"Airtel Code-in",
        "startDate":"08 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"React JS",
        "category":"live",
      },
      {
        "cid":"7",
        "cname":"Airtel Hiring Challenge",
        "startDate":"10 June",
        "endDate":"22 June",
        "startTime":"8:00 AM",
        "endTime":"8:00 PM",
        "img":"",
        "type":"Competitive",
        "category":"live",
      },
      {
        "cid":"8",
        "cname":"Thapar Hackathon",
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
        cid={challenge.cid}
        login={() => { this.child.openLoginModal(); }} 
        />
      </div> 
    );

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

    else{
      return (
        <div className="complete-body">
          <Header ref={instance => { this.child = instance; }} />
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
}

export default Home;
