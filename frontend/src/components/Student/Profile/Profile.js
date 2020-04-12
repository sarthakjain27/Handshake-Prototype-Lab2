import React from 'react';
import {
  Col, Button, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { getStudentProfile, updateStudentProfile } from '../../../actions/profileActions';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
      collegeName: '',
      city: '',
      cstate: '',
      country: '',
      contactPhone: '',
      contactEmail: '',
      careerObjective: '',
      dateOfBirth: new Date(),
      selectedFile: null,
    };
    this.editProfileHandlerSubmit = this.editProfileHandlerSubmit.bind(this);
    this.dateOfBirthChangeHandler = this.dateOfBirthChangeHandler.bind(this);
    this.profileFileUploadHandler = this.profileFileUploadHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getStudentProfile({ emailId: localStorage.getItem('email_id') });
    } else {
      console.log(this.props);
      this.props.getStudentProfile({ emailId: this.props.match.params.id });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.profile) {
      const { profile } = nextProps;
      let prevBirthDate = '';
      if (profile.dateOfBirth !== '') {
        prevBirthDate = new Date(profile.dateOfBirth.split('/')[0], parseInt(profile.dateOfBirth.split('/')[1]) - 1, profile.dateOfBirth.split('/')[2]);
      } else prevBirthDate = new Date();
      this.setState({
        studentName: profile.name,
        collegeName: profile.collegeName,
        dateOfBirth: prevBirthDate,
        city: profile.city,
        cstate: profile.state,
        country: profile.country,
        careerObjective: profile.careerObjective,
        contactPhone: profile.contactPhone,
        contactEmail: profile.contactEmail,
      });
    }
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  profileFileUploadHandler(e) {
    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      console.log(this.state.selectedFile);
    });
  }

  dateOfBirthChangeHandler(date) {
    this.setState({
      dateOfBirth: date,
    });
  }

  editProfileHandlerSubmit(e) {
    e.preventDefault();
    if (this.state.studentName === '' || this.state.collegeName === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.careerObjective === '' || this.state.contact_email === '' || this.state.contactPhone === '' || this.state.dateOfBirth === '') {
      window.alert('Please enter all fields');
    } else {
      const fd = new FormData();
      fd.append('emailId', localStorage.getItem('email_id'));
      fd.append('studentName', this.state.studentName);
      fd.append('collegeName', this.state.collegeName);
      fd.append('city', this.state.city);
      fd.append('cstate', this.state.cstate);
      fd.append('country', this.state.country);
      fd.append('careerObjective', this.state.careerObjective);
      fd.append('contactPhone', this.state.contactPhone);
      fd.append('contact_email', this.state.contactEmail);
      fd.append('dateOfBirth', `${this.state.dateOfBirth.getFullYear()}/${this.state.dateOfBirth.getMonth() + 1}/${this.state.dateOfBirth.getDate()}`);
      fd.append('file', this.state.selectedFile);

      // for (var pair of fd.entries()) {
      //   console.log(pair[0]+ ': ' + pair[1]);
      // }
      this.props.updateStudentProfile(fd);
    }
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <br />
        <div>
          <form onSubmit={this.editProfileHandlerSubmit}>
            <FormGroup row>
              <Label for="profilePicture" sm={2}>Profile Picture</Label>
              <Col sm={10}>
                <Input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={this.profileFileUploadHandler} />
                <FormText color="muted">
                  Upload new Profile Picture. Leave it to keep the previous one.
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="studentName" sm={2}>Student Name</Label>
              <Col sm={3}>
                <Input type="text" name="studentName" id="studentName" value={this.state.studentName} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="collegeName" sm={2}>College Name</Label>
              <Col sm={3}>
                <Input type="text" name="collegeName" id="collegeName" value={this.state.collegeName} onChange={this.onChangeHandler} required />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="contactEmail" sm={1}>Contact Email</Label>
              <Col sm={2}>
                <Input type="email" name="contactEmail" id="contactEmail" value={this.state.contactEmail} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="contactPhone" sm={1}>Contact Phone</Label>
              <Col sm={2}>
                <Input type="number" name="contactPhone" id="contactNumber" value={this.state.contactPhone} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="dateOfBirth" sm={1}>Date of Birth</Label>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  selected={this.state.dateOfBirth}
                  onChange={this.dateOfBirthChangeHandler}
                  required
                />
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
              <Label for="careerObjective" sm={2}>Career Objective</Label>
              <Col sm={8}>
                <Input type="textarea" name="careerObjective" id="careerObjective" rows="7" onChange={this.onChangeHandler} value={this.state.careerObjective} required />
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
  profile: state.profile.user,
});

export default connect(mapStateToProps, { getStudentProfile, updateStudentProfile })(Profile);
