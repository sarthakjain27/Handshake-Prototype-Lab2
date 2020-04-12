import React from 'react';
import './SignUp.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import '../../../node_modules/react-dropdown/style.css';
import { Signup } from '../../actions/signupActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'student',
      userOptions: ['student', 'company'],
    };
    this.onChangeUserHandler = this.onChangeUserHandler.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const { user } = nextProps;

      if (user === 'Exists' || user === 'Error' || user === 'Saving Error' || user === 'Hashing Error' || user === 'User successfully created' || user === 'Error in making signup axios call') {
        this.setState({
          signupFlag: 1,
        });
      }
    }
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeUserHandler(e) {
    this.setState({
      user: e.value,
    });
  }

  onSignUpSubmit(e) {
    e.preventDefault();
    const data = {
      emailId: this.state.emailId.toLowerCase(),
      password: this.state.password,
      user: this.state.user,
      name: this.state.name,
    };
    if (this.state.user === 'student') {
      data.collegeName = this.state.collegeName;
    } else {
      data.city = this.state.city;
      data.state = this.state.cstate;
      data.country = this.state.country;
    }

    this.props.Signup(data);
  }

  render() {
    let redirectVar = null;
    let message = '';
    if (localStorage.getItem('userRole') === 'company') {
      redirectVar = <Redirect to="/listPostings" />;
    } else if (localStorage.getItem('userRole') === 'student') {
      redirectVar = <Redirect to="/viewPostedJobs" />;
    } else if (this.props.user === 'User successfully created' && this.state.signupFlag) {
      alert('Successfully Registered');
      redirectVar = <Redirect to="/" />;
    } else if ((this.props.user === 'Error' || this.props.user === 'Saving Error' || this.props.user === 'Hashing Error') && this.state.signupFlag) {
      message = 'Error in querying the database';
    } else if (this.props.user === 'Exists' && this.state.signupFlag) {
      message = 'Email id is already registered';
    } else if (this.props.user === 'Error in making signup axios call' && this.state.signupFlag) {
      message = 'Error in connecting to server';
    }
    let differentDiv = (
      <div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="City"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="cstate"
            placeholder="State"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="country"
            placeholder="Country"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeHandler}
            required
          />
        </div>
      </div>
    );

    if (this.state.user === 'student') {
      differentDiv = (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="collegeName"
            placeholder="College Name"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeHandler}
            required
          />
        </div>
      );
    }
    return (
      <div className="container">
        {redirectVar}
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Handshake SignUp</h2>
            </div>
            <form onSubmit={this.onSignUpSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="emailId"
                  placeholder={this.state.user === 'student' ? 'Student Username' : 'Company Username'}
                  onChange={this.onChangeHandler}
                  required
                  autoFocus
                  autoComplete="true"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  pattern=".{6,}"
                  title="Minimum 6 Characters Required"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder={this.state.user === 'student' ? 'Student Name' : 'Company Name'}
                  pattern="^[a-zA-Z0-9]+([ .,]{*}[a-zA-Z0-9]+)*$"
                  title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
                  onChange={this.onChangeHandler}
                  required
                />
              </div>
              {differentDiv}
              <div className="form-group">
                <Dropdown
                  options={this.state.userOptions}
                  onChange={this.onChangeUserHandler}
                  value={this.state.user}
                  required
                />
              </div>
              <div style={{ color: '#ff0000' }}>{message}</div>
              <br />
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <br />
              <br />
              <br />
              <div>
                <Link to="/">Go Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.signup.user,
});

export default connect(mapStateToProps, { Signup })(SignUp);
