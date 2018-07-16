import React, { Component } from 'react';
import Header from '../Components/Header';
import loader from '../../../img/loader.svg';
import { Redirect } from 'react-router';
import BASE_URL from '../../../config.js';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
      users:[],
      loading:true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    
    let url = BASE_URL+'/users'
    
    fetch(url)
        .then(res => res.json())
        .then((result) => {
          console.log("users",result);
          this.setState({
            users:result,
            loading:false,
          });
        }, (error) => {
            console.log(error);
    });
  }

  handleChange(e){
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }

  downloadFile(uid){
    let url=BASE_URL+'/resume/'+uid;
    window.open(url, '_blank');
  }

  render() {

    if(!sessionStorage['admin']){
      return <Redirect to='/admin/login/' />
    }

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
      let searchResults = this.state.users.filter(
        (user) => {
          return ((user["uname"].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1));
        }
      );

      return(
        <div className="complete-body">
          <Header/>
          <div className="container mt-4">
            <h4 className="text-left">Users</h4>
            <div className="row mt-4">
              <div className="col-md-3">
                <input type="text" name="search" placeholder="Search.." className="form-control" value={this.state.search} onChange={this.handleChange}/>
              </div>
            </div>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th className="text-left">User Id</th>
                  <th className="text-left">User Name</th>
                  <th className="text-left">Email</th>
                  <th>Resume/Profile</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(
                  (user) => (
                    <tr key={user.id}>
                      <td className="text-left">{user.id}</td>
                      <td className="text-left">{user.uname}</td>
                      <td className="text-left">{user.emailid}</td>
                      <td>
                      <button type="button" onClick={() => this.downloadFile(user.id)} className="btn btn-info btn-sm mr-2" disabled={user.resume === null ? "disabled" : ""} >Download Resume</button>
                      <a href={"/admin/user/profile?uid="+user.id} className="btn btn-info btn-sm">View Profile</a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}




export default Users;
