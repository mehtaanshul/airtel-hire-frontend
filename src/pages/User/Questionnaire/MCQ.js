import React, { Component } from 'react';

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
      "question1":[ false,false,false,false]
    }
    this.setState({ answers });
  }

  onOptionSelect(e){
    this.state.answers[e.target.name] = [false,false,false,false];
    this.state.answers[e.target.name][e.target.id] = true;
    this.setState(this.state);
  }


  render(){
    return (
      <div className="mcq">
        <h6><strong>Question 1</strong></h6>
        <hr/>
        Given a sorted array of integers, what can be the minimum worst case time complexity to find ceiling of a number x in given array? Ceiling of an element x is the smallest element present in array which is greater than or equal to x. Ceiling is not present if x is greater than the maximum element present in array. For example, if the given array is {12, 67, 90, 100, 300, 399} and x = 95, then output should be 100.
        <br/>
        <div class="mt-4">
          <div className="row mt-2 ml-1">
            <div className={this.state.answers["question1"][0] ? "mcq-label-selected" : "mcq-label-not-selected"}>
              A
            </div>
            <button type="button" 
              name="question1" 
              id="0" 
              onClick={this.onOptionSelect} 
              className={this.state.answers["question1"][0] ? "btn btn-outline-info option-selected  mcq-prepend-label" : "btn btn-outline-info mcq-prepend-label"}>
              T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)
            </button>
          </div>
          <div className="row mt-2 ml-1">
            <div className={this.state.answers["question1"][1] ? "mcq-label-selected" : "mcq-label-not-selected"}>
              B
            </div>
            <button type="button" name="question1" id="1" onClick={this.onOptionSelect} className={this.state.answers["question1"][1] ? "btn btn-outline-info option-selected mcq-prepend-label" : "btn btn-outline-info mcq-prepend-label"}>T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)</button>
          </div>
          <div className="row mt-2 ml-1">
            <div className={this.state.answers["question1"][2] ? "mcq-label-selected" : "mcq-label-not-selected"}>
              C
            </div>
            <button type="button" name="question1" id="2" onClick={this.onOptionSelect} className={this.state.answers["question1"][2] ? "btn btn-outline-info option-selected mcq-prepend-label" : "btn btn-outline-info mcq-prepend-label"}>T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)</button>
          </div>
          <div className="row mt-2 ml-1">
            <div className={this.state.answers["question1"][3] ? "mcq-label-selected" : "mcq-label-not-selected"}>
              D
            </div>
            <button type="button" name="question1" id="3" onClick={this.onOptionSelect} className={this.state.answers["question1"][3] ? "btn btn-outline-info option-selected mcq-prepend-label" : "btn btn-outline-info mcq-prepend-label"}>T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)</button>
          </div>
        </div>
      </div>

    );
  }
}

export default MCQ;