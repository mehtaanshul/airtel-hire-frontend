import React, { Component } from 'react';

class MCQ extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer:'',
    }
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }


  

  onOptionSelect(index){
    
    this.setState({
      answer: (index+1),
    });

    this.props.onSelect(this.props.index,this.props.data.qid,(index+1));
  }


  render(){
    return (
      <div className="mcq">
        <h6><strong>{"Question "+(this.props.index+1)}</strong></h6>
        <hr/>
        {this.props.data.qstatement}
        <br/>
        <div className="mt-4">
          {this.props.data.options.map(
            (option,index) => (
              <div key={index} className="row mt-2 ml-1">
                <div className={this.state.answer == (index+1) ? "mcq-label-selected" : "mcq-label-not-selected"}>
                  {(index+1)}
                </div>
                <button type="button" 
                  name="question1"  
                  onClick={() => this.onOptionSelect(index)} 
                  className={this.state.answer === (index+1) ? "btn btn-outline-info option-selected  mcq-prepend-label" : "btn btn-outline-info mcq-prepend-label"}>
                  {option}
                </button>
              </div>
            )
          )}
        </div>
      </div>

    );
  }
}

export default MCQ;