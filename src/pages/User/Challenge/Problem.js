import React, { Component } from 'react';
import Header from '../Components/Header';

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div className="font-face">
        <Header />
        <div className="text-left problems-heading bg-light p-4 mb-4">
          <h1>Airtel Crack the Code</h1>
          <small className="text-secondary">Apr 15, 2018, 09:00 AM IST - Jun 14, 2018, 11:55 PM IST</small>
        </div>
        <div className="row p-4">
          <div className="col-lg-8">
            <button type="button" class="btn btn-info float-right mb-1">Leaderboard</button>
            <a href="/problems" className="btn btn-info float-right mr-2">All Problems</a>
            <h4 className="text-left problem-title">Problem title</h4>
            
            <hr/>
            <div className="text-left">
              <h4>Problem Statement</h4>
              <p>Currently, animal detection and recognition are still a difficult challenge and there is no unique method that provides a robust and efficient solution to all situations. Generally, features from the animal that belongs to a certain class are used to train a certain classifier. Then, given a new input image, the classifier will be able to decide if the sample is the animal or not. To better understand the complexities of natural ecosystems and better manage and better protect them, it would be helpful if we can differentiate the animals based on their attributes and characteristics.</p>
              <p>In this challenge, you will be given 18000 images of 50 animals classes with pre-extracted feature representation for each image. The classes are aligned with Osherson&rsquo;s classical class/attribute matrix, thereby providing 85 numeric attribute values for each class.</p>
              <p>Given the image of an animal, your task is to identify all the characteristics/ attributes associated with that animal.</p>
              <h4>Data Description:</h4>
              <p>You&rsquo;re given two different files (csv and images) to download. The train data consists of 12600 images and the test data consists of 5400 images of 50 animal classes with pre-extracted feature representations for each image. Some part of the data has been anonymized to restrict fraudulent submissions.</p>
              <h4>Submission</h4>
              <p>A participant has to submit a .csv file containing the Image_name and the corresponding attributes associated with that image in the .csv format. Check the sample submission file for the format.</p>
              <h4>Evaluation Metric</h4>
              <p>The submissions will be evaluated based on F1 Score with &lsquo;average = samples&rsquo;.</p>
              <h4>Scripts</h4>
              <p>Keras CNN Stater Code:</p>
              <h4>Announcement</h4>
              <p>To keep the competition fair and unbiased, we have prohibited the use of external data. Please check the guidelines&nbsp;on the page.&nbsp;</p>
            </div>
          </div>
          <div className="col-lg-4">
            <form>
              <div className="form-group text-left">
                <label>Upload Solution</label>
                <input type="file" class="form-control-file"/>
              </div>
              <button type="button" class="btn btn-success float-left">Submit</button>
            </form>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Problem;
