import React, { Component } from 'react';

class Subjective extends Component {
  constructor(props){
    super(props);
    this.state = {
      answers:{},
    }
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }

  componentWillMount(){
    let answers = {
      "question1":[ false,false]
    }
    this.setState({ answers });
  }

  onOptionSelect(e){
    this.state.answers[e.target.name] = [false,false];
    this.state.answers[e.target.name][e.target.id] = true;
    this.setState(this.state);
  }


  render(){
    return (
      <div className="subjective">
        <h6><strong>Question 2</strong></h6>
        <hr/>
        Given a sorted array of integers, what can be the minimum worst case time complexity to find ceiling of a number x in given array? Ceiling of an element x is the smallest element present in array which is greater than or equal to x. Ceiling is not present if x is greater than the maximum element present in array. For example, if the given array is {12, 67, 90, 100, 300, 399} and x = 95, then output should be 100.
        <br/>
        <div className="mt-4">
          <div className="row">
            <div className="col-lg-2">
              <button 
                type="button" 
                name="question1" 
                id="0" onClick={this.onOptionSelect} 
                className={this.state.answers["question1"][0] ? "btn btn-outline-info btn-block option-selected" : "btn btn-outline-info btn-block"}>
                True
              </button>
            </div>
            <div className="col-lg-2">
              <button 
                type="button" 
                name="question1" 
                id="1" 
                onClick={this.onOptionSelect}
                className={this.state.answers["question1"][1] ? "btn btn-outline-info btn-block option-selected" : "btn btn-outline-info btn-block"}>
                False</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Subjective;