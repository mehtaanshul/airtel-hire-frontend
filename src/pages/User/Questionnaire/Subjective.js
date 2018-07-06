import React, { Component } from 'react';

class Subjective extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer:'',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      answer:e.target.value,
    });
    this.props.onSelect(this.props.index,this.props.data.qid,this.state.answer);
  }
  render(){
    return (
      <div className="subjective">
        <h6><strong>{"Question "+(this.props.index+1)}</strong></h6>
        <hr/>
        {this.props.data.qstatement}
        <div className="row mt-4">
          <div className="col-md-6">
            <textarea name="" value={this.state.answer} onChange={this.handleChange} className="form-control" rows="3" ></textarea>
          </div>
        </div>
      </div>

    );
  }
}

export default Subjective;