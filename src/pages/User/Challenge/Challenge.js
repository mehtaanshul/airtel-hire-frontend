import React, { Component } from 'react';
import Header from '../Components/Header';
import sample from '../../../img/banner.gif';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderLive(){
    return(
      <div className="col-lg-3 float-right">
        <a href="/problems" className="btn btn-success btn-block">Start Now</a>
      </div>
    );
  }

  renderRegister(){
    return(
      <div className="col-lg-3 float-right">
        <a href="#" className="btn btn-success btn-block">Register</a>
      </div>
    );
  }

  renderPrevious(){
    return(
      <div className="col-lg-3 float-right">
        <button href="#" className="btn btn-success btn-block" disabled>Ended</button>
      </div>
    );
  }

  render() {

    return (
      <div className="complete-body">
        <Header />
        <img src={sample} className="w-100" alt=""/>
        <div className="jumbotron text-left">
        {this.props.category == 'live' && this.renderLive()}
        {this.renderLive()}
          <div className="col-lg-8">
            <h5>About the Challenge</h5>
            <hr/>
            <p>The field of object recognition in natural images has made tremendous progress over the last decade. For specific object classes, in particular faces, pedestrians, and vehicles, reliable and efficient detectors are available, based on the combination of powerful low-level features with modern machine learning techniques. However, in order to achieve good classification accuracy, these systems require a lot of manually labeled training data, typically several thousand example images for each class to be learned.</p>
            <p>While building recognition systems this way is feasible for categories of large common or commercial interest, one cannot expect it to solve object recognition for all natural categories. Humans usually observe and classify objects from a list of high-level semantically meaningful properties that we call attributes. Attributes are typically nameless properties, e.g. the color of an object, or the presence or absence of a certain body part. To better understand the complexities of natural ecosystems and better manage and better protect them, it would be helpful if we can differentiate the animals based upon their attributes and characteristics.</p>
            <p>In this dataset, we provide 18000 images of 50 animal classes with pre-extracted feature representation for each image. In the next 60 days, we challenge you to build prediction models that can identify all the attributes associated with each animal.</p>
            <p><strong>Why should you participate?</strong></p>
            <ul>
            <li>To learn and use the latest open-source libraries and packages</li>
            <li>To learn by working on live problems because it excites you more than learning from books and tutorials!</li>
            <li>To build your fan following in our community</li>
            <li>Of course, grab cash prizes</li>
            </ul>
            <p><strong>Who should participate?</strong></p>
            <ul>
            <li>Working professionals</li>
            <li>Data Science/Machine Learning enthusiasts</li>
            <li>College students (if you understand basics of predictive modelling)</li>
            </ul>
            <h5>Prizes</h5>
            <hr/>
            <ul>
              <li>Working professionals</li>
              <li>Data Science/Machine Learning enthusiasts</li>
              <li>College students (if you understand basics of predictive modelling)</li>
            </ul>
            <h5>Guidelines</h5>
            <hr/>
            <h5>FAQs</h5>
            <hr/>
          </div>
        </div>  
      </div>
    );
  }
}

export default Challenge;
