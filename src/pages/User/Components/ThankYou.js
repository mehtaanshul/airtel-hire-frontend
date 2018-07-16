import React, { Component } from 'react';
import BASE_URL from '../../../config.js';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:this.props.show,
    };
    this.closeModal = this.closeModal.bind(this);
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


  renderModal() {
    return (
      <div>
        <div className="thankyou-modal">
        </div>
        <div className="thankyou-modal-body">
          <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="align-self-center mt-5">
            <h4>Solution uploaded successfully.</h4>
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

export default ThankYou;
