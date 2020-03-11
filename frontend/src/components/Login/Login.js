import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Dropdown from 'react-dropdown';
import '../../../node_modules/react-dropdown/style.css';
import { userLogin } from '../../actions/loginAction';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      emailId:'',
      password:'',
      user:'',
      userOptions:['student','company']
    };
    this.onChangeUserHandler = this.onChangeUserHandler.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
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
      this.props.userLogin(data);
      this.setState({
        loginFlag: 1
      });
    }
  }

  render() {
    let redirectVar = null;
    let message = "";

    // Would need to replace this with passport strategy session management then just add check
    // for presence of jwt in else if (this.prop.user and redirect)
    if(localStorage.getItem('userRole') === 'company'){
      redirectVar = <Redirect to="/listPostings"/>
    } else if(localStorage.getItem('userRole') === 'student'){
      redirectVar = <Redirect to="/viewPostedJobs"/>
    } 

    if (this.props.user === "User Not Present" && this.state.loginFlag){
      message = "No user with this email id";
    } else if(this.props.user === "Wrong Password" && this.state.loginFlag){
      message = "Wrong Password Given";
    } else if(this.props.user === "Error" && this.state.loginFlag){
      message = "Error in connecting to database";
    } else if(this.props.user === "Error in comparing Password" && this.state.loginFlag){
      message = "Error in comparing the password";
    } else if(this.props.user === "Wrong UserRole Given" && this.state.loginFlag){
      message = "Wrong User role given";
    } else if(this.props.user && this.props.user.profilePictureUrl && this.state.loginFlag){
      localStorage.setItem('user_id',this.props.user._id);
      localStorage.setItem('email_id',this.state.emailId.toLowerCase());
      localStorage.setItem('userRole',this.state.user);
      localStorage.setItem('profile_picture_url',this.props.user.profilePictureUrl);
      if(this.state.user === 'company') {
        redirectVar = <Redirect to="/listPostings"/>
      }
      else {
        redirectVar = <Redirect to="/viewPostedJobs"/>
      }
    }
    return(
        <div className="container">
          {redirectVar}
            <div className="login-form">
                <div className="main-div">
                    <div className="panel">
                        <h2>Handshake Login</h2>
                        <p>Please enter your username and password</p>
                    </div>
                    <form onSubmit={this.onLoginSubmit}>
                      <div style={{ color: "#ff0000" }}>{message}</div><br />
                        <div className="form-group">
                            <input type="email" 
                                    className="form-control" 
                                    name="emailId" 
                                    placeholder="Username"
                                    onChange={this.onChangeHandler}
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
                                    onChange={this.onChangeHandler}
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

const mapStateToProps = state => { 
  return ({
  user: state.login.user
})};

export default connect(mapStateToProps, { userLogin })(Login);;