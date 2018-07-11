import React, { Component } from 'react';

class TrueFalse extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer:'',
    }
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }


  onOptionSelect(value){
    this.setState({
      answer:value,
    })
    this.props.onSelect(this.props.index,this.props.data.qid,value);
  }


  render(){
    return (
      <div className="true-false">
        <h6><strong>{"Question "+(this.props.index+1)}</strong></h6>
        <hr/>
        {this.props.data.qstatement}
        <br/>
        <div className="mt-4">
          <div className="row">
            <div className="col-lg-2">
              <button 
                type="button" 
                onClick={() => this.onOptionSelect(true)} 
                className={this.state.answer === true ? "btn btn-outline-info btn-block option-selected" : "btn btn-outline-info btn-block"}>
                True
              </button>
            </div>
            <div className="col-lg-2">
              <button 
                type="button"
                onClick={() => this.onOptionSelect(false)}
                className={this.state.answer === false ? "btn btn-outline-info btn-block option-selected" : "btn btn-outline-info btn-block"}>
                False</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default TrueFalse;