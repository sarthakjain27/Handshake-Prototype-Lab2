import React from 'react';
import {
  Col, Button, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateEducation } from '../../../actions/profileActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import CustomNavBar from '../../NavBar/CustomNavBar';

class EditEducation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeName: sessionStorage.getItem('college_name'),
      city: sessionStorage.getItem('city'),
      cstate: sessionStorage.getItem('state'),
      country: sessionStorage.getItem('country'),
      degree: sessionStorage.getItem('degree'),
      major: { label: sessionStorage.getItem('major'), value: sessionStorage.getItem('major') },
      yearOfPassing: sessionStorage.getItem('year_of_passing'),
      cgpa: sessionStorage.getItem('cgpa'),
      educationId: sessionStorage.getItem('education_id'),
      allMajors: [{ label: 'Computer Science', value: 'Computer Science' },
        { label: 'Computer Engineering', value: 'Computer Engineering' },
        { label: 'Software Engineering', value: 'Software Engineering' },
        { label: 'Electrical Engineering', value: 'Electrical Engineering' },
        { label: 'Electronics Engineering', value: 'Electronics Engineering' },
        { label: 'Data Science', value: 'Data Science' },
        { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
        { label: 'Chemical Engineering', value: 'Chemical Engineering' },
        { label: 'Metallurgy Engineering', value: 'Metallurgy Engineering' },
        { label: 'Civil Engineering', value: 'Civil Engineering' }],
    };
    this.majorChangeHandler = this.majorChangeHandler.bind(this);
    this.submitChangeHandler = this.submitChangeHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  majorChangeHandler(e) {
    this.setState({
      major: e,
    }, () => {
      console.log(`Selected Major: ${this.state.major.value}`);
      console.log(e);
    });
  }

  submitChangeHandler(e) {
    e.preventDefault();
    if (this.state.collegeName === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.degree === '' || this.state.major === '' || this.state.yearOfPassing === '' || this.state.cgpa === '') {
      window.alert('Please enter all fields');
    } else {
      const data = {
        collegeName: this.state.collegeName,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        degree: this.state.degree,
        major: this.state.major.value,
        yearOfPassing: this.state.yearOfPassing,
        cgpa: this.state.cgpa,
        educationId: this.state.educationId,
        emailId: localStorage.getItem('email_id'),
      };
      this.props.updateEducation(data);
    }
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <br />
        <div>
          <form onSubmit={this.submitChangeHandler}>
            <FormGroup row>
              <Label for="collegeName" sm={2}>College Name</Label>
              <Col sm={7}>
                <Input type="text" name="collegeName" id="collegeName" value={this.state.collegeName} onChange={this.onChangeHandler} required />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="city" sm={1}>City</Label>
              <Col sm={2}>
                <Input type="text" name="city" id="city" value={this.state.city} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="state" sm={1}>State</Label>
              <Col sm={2}>
                <Input type="text" name="cstate" id="state" value={this.state.cstate} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="country" sm={1}>Country</Label>
              <Col sm={2}>
                <Input type="text" name="country" id="country" value={this.state.country} onChange={this.onChangeHandler} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="degree" sm={2}>Degree</Label>
              <Col sm={3}>
                <Input type="text" name="degree" id="degree" value={this.state.degree} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="major" sm={2}>Major</Label>
              <Col sm={4}>
                <Select
                  onChange={this.majorChangeHandler}
                  options={this.state.allMajors}
                  value={this.state.major}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="yearOfPassing" sm={2}>Year Of Passing</Label>
              <Col sm={3}>
                <Input type="text" name="yearOfPassing" id="yearOfPassing" value={this.state.yearOfPassing} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="cgpa" sm={2}>CGPA</Label>
              <Col sm={3}>
                <Input type="text" name="cgpa" id="cgpa" value={this.state.cgpa} onChange={this.onChangeHandler} required />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 4, offset: 5 }}>
                <Button style={{ width: 150, height: 50 }}>Update</Button>
              </Col>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { updateEducation })(EditEducation);
