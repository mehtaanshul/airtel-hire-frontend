import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';

class OnlineTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
    };
  }


  render() {

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
        <Header />
        <div className="container mt-4 text-left">
          <MCQ/>
        </div>
        </div>
      );
    }
  }
}


class MCQ extends Component {
  constructor(props){
    super(props);
    this.state = {
      answers:{},
    }
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }

  componentWillMount(){
    let answers = {
      "question1":[
        {"checked":false},
        {"checked":false},
        {"checked":false},
        {"checked":false},
      ]
    }
    this.setState({ answers });
  }

  onOptionSelect(e){
    this.state.answers[e.target.name] = [
        {"checked":false},
        {"checked":false},
        {"checked":false},
        {"checked":false},
      ];
    this.state.answers[e.target.name][e.target.id]["checked"] = true;
    this.setState(this.state);
  }


  render(){
    console.log(this.state.answers["question1"][1]["checked"]);
    return (
      <div>
        <h6><strong>Question 1</strong></h6>
        <hr/>
        Given a sorted array of integers, what can be the minimum worst case time complexity to find ceiling of a number x in given array? Ceiling of an element x is the smallest element present in array which is greater than or equal to x. Ceiling is not present if x is greater than the maximum element present in array. For example, if the given array is {12, 67, 90, 100, 300, 399} and x = 95, then output should be 100.
        <br/>
        <div class="btn-group-vertical mt-4">
          <button type="button" name="question1" id="0" onClick={this.onOptionSelect} className={this.state.answers["question1"][0]["checked"] ? "btn btn-outline-info mcq-checkbox" : "btn btn-outline-info"}>T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)</button>
          <button type="button" name="question1" id="1" onClick={this.onOptionSelect} className={this.state.answers["question1"][1]["checked"] ? "btn btn-outline-info mcq-checkbox" : "btn btn-outline-info"}>T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)</button>
          <button type="button" name="question1" id="2" onClick={this.onOptionSelect} className={this.state.answers["question1"][2]["checked"] ? "btn btn-outline-info mcq-checkbox" : "btn btn-outline-info"}>T(n) = 2T(n/2) + O(1) and T(1)</button>
          <button type="button" name="question1" id="3" onClick={this.onOptionSelect} className={this.state.answers["question1"][3]["checked"] ? "btn btn-outline-info mcq-checkbox" : "btn btn-outline-info"}>T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)</button>
        </div>
      </div>

    );
  }
}

export default OnlineTest;
