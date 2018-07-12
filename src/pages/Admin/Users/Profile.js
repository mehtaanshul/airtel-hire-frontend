import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[],
      loading:true,
    };
  }

  componentWillMount() {

    const url = new URL(document.URL);
    const params = new URLSearchParams(url.search.slice(1));
    const type = params.get('type');
    var uid = params.get('uid');
    
    let furl = 'http://192.168.1.26:8080/users/'+uid;
    
    fetch(furl)
        .then(res => res.json())
        .then((result) => {
          this.setState({
            user:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  downloadFile(uid){
    let url='http://192.168.1.26:8080/resume/'+uid;
    window.open(url, '_blank');
  }

  render() {
    const { user } = this.state;
    if(this.state.loading){
      return(
        <div>
        <Header/>
          <div className="loader-svg">
            <img src={loader}/>
          </div>
        </div>
      );
    }
    else {
      return(
        <div className="complete-body">
          <Header/>
          <div className="container mt-4 text-left">
            <h4 className="text-left">User Profile</h4>
            <div className="row">
              <div className="col-md-8">
                <table class="table mt-4">
                  <tbody>
                    <tr>
                      <td>Full Name</td>
                      <td><strong>{user.uname}</strong></td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td><strong>{user.emailid}</strong></td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td><strong>{user.phone_number}</strong></td>
                    </tr>
                    <tr>
                      <td>College</td>
                      <td>{user.collegename}</td>
                    </tr>
                    <tr>
                      <td>Degree</td>
                      <td><strong>{user.degree}</strong></td>
                    </tr>
                    <tr>
                      <td>Specialization</td>
                      <td><strong>{user.Specialization}</strong></td>
                    </tr>
                    <tr>
                      <td>Year of Graduation</td>
                      <td><strong>{user.year}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <button type="button" onClick={() => this.downloadFile(user.id)} class="btn btn-info">Download Resume</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}




export default Profile;
