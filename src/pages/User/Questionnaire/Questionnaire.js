import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';
import MCQ from './MCQ';
import TrueFalse from './TrueFalse';

class Questionnaire extends Component {
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
          <MCQ/>
          <TrueFalse/>
          <div className="row">
            <div className="col-lg-3 questionnaire-button">
              <button type="button" class="btn btn-success btn-block">Submit</button>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
}




export default Questionnaire;
