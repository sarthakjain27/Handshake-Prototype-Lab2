import React from 'react';
import './Login.css';
import axios from 'axios';
import {serverIp, serverPort} from '../../config';
import Dropdown from 'react-dropdown';
import '../../../node_modules/react-dropdown/style.css';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      emailId:'',
      password:'',
      user:'',
      userOptions:['student','company']
    };
    this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
    this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
    this.onChangeUserHandler = this.onChangeUserHandler.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }


  onChangeUserNameHandler(e){
    this.setState({
      emailId:e.target.value
    });
  }

  onChangePasswordHandler(e){
    this.setState({
      password:e.target.value
    });
  }

  onChangeUserHandler(e){
    this.setState({
      user:e.value
    });
  }

  onLoginSubmit(e){
    e.preventDefault();
    if(this.state.user === ''){
      window.alert('Please select a User Role from Dropdown');
    }
    else{
      const data = {
        emailId: this.state.emailId.toLowerCase(),
        password: this.state.password,
        user: this.state.user
      }
  
      axios.defaults.withCredentials = true;
      axios.post(serverIp+':'+serverPort+'/login',data)
      .then(response => {
        console.log('Login Response Data');
        console.log(response.data);
        if(response.data === 'User Not Present') {
          window.alert('Given username not present.')
        } else if(response.data === 'Wrong Password') {
          window.alert('Wrong Password given')
        } else if (response.data === 'Error'){
          window.alert('Error in Connecting to Database');
        } else if(response.data === 'Error in comparing Password'){
          window.alert('Error in comparing the password');
        } else if(response.data === 'Wrong UserRole Given'){
          window.alert('Wrong UserRole Given from the dropdown');
        }else {
            localStorage.setItem('email_id',this.state.emailId.toLowerCase());
            localStorage.setItem('userRole',this.state.user);
            localStorage.setItem('profile_picture_url',response.data['profilePictureUrl']);
            if(this.state.user === 'company') {
              window.location.href = '/listPostings';
            }
            else {
              window.location.href = '/viewPostedJobs';
            }
        }
      }).catch(err => {
        console.log(`In catch of axios post call to login api ${err}`);
        window.alert('Error in Login API axios Post call');
      });
    }
  }

  render() {
    if(localStorage.getItem('userRole') === 'company'){
      window.location.href = '/listPostings';
    } else if(localStorage.getItem('userRole') === 'student'){
      window.location.href = '/viewPostedJobs'
    }
    return(
        <div className="container">
            <div className="login-form">
                <div className="main-div">
                    <div className="panel">
                        <h2>Handshake Login</h2>
                        <p>Please enter your username and password</p>
                    </div>
                    <form onSubmit={this.onLoginSubmit}>
                        <div className="form-group">
                            <input type="email" 
                                    className="form-control" 
                                    name="username" 
                                    placeholder="Username"
                                    onChange={this.onChangeUserNameHandler}
                                    required 
                                    autoFocus
                                    autoComplete/>
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                    className="form-control" 
                                    name="password" 
                                    placeholder="Password"
                                    pattern=".{6,}"
                                    title="Minimum 6 Characters Required"
                                    onChange={this.onChangePasswordHandler}
                                    required />
                        </div>
                        <div className="form-group">
                          <Dropdown
                            options={this.state.userOptions}
                            onChange={this.onChangeUserHandler}
                            value={this.state.user}
                            placeholder='You are a'
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                          Don't have an account ? <a href='/signup'>Create One</a>
                        </div>
                    </form>         
                </div>
            </div>
        </div>
    );
  }

}

export default Login;