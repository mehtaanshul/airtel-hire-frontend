import React, { Component } from 'react';

class QuestionCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:this.props.show,
      questionCount:'',
      formErrors:{

      },
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal:nextProps.show,
    });
  }

  closeModal(){
    this.setState({
      showModal:false,
    });
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }
  

  onSubmit(e){

    this.validateForm();

    if(Object.keys(this.state.formErrors).length > 0){
      e.preventDefault();
      return;
    }
    this.props.onModalClose(this.state.questionCount);
  }


  validateForm(){

    if(this.state["questionCount"].trim().length === 0){
      this.state.formErrors["questionCount"] = true;
    }
    else {
      delete this.state.formErrors["questionCount"];
    }
    
    if(Object.keys(this.state.formErrors).length > 0){
      this.setState(this.state);
      return;
    }

  }

  renderModal(){
    return (
      <div>
        <div className="rating-modal">
        </div>
        <div className="rating-modal-body">
          <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="form-group mt-4">
            <div className="offset-md-1 col-md-10">
              <label className="float-left label-text">Number of Questions</label>
              <input type="number" name="questionCount" onChange={this.handleChange} value={this.state.questionCount} className="form-control form-input"/>
              <small>{this.state.formErrors['questionCount'] && "Please enter question count"}</small>
            </div>
          </div>
          <div className="offset-md-1 col-md-10 mb-4">
            <button type="button" onClick={this.onSubmit} className="btn btn-success btn-block">ADD</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
      {this.state.showModal && this.renderModal()}
      </div>
    );
  }
}

export default QuestionCount;
