import React from 'react';
import {
  Col, Button, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateCompanyProfile } from '../../../actions/profileActions';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      company_name: this.props.profile.name,
      city: this.props.profile.city,
      cstate: this.props.profile.state,
      country: this.props.profile.country,
      description: this.props.profile.description,
      contact_phone: this.props.profile.contactPhone,
      contact_email: this.props.profile.contactEmail,
      selectedFile: null,
    };
    this.editProfileHandlerSubmit = this.editProfileHandlerSubmit.bind(this);
    this.profileFileUploadHandler = this.profileFileUploadHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  profileFileUploadHandler(e) {
    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      console.log(this.state.selectedFile);
    });
  }

  editProfileHandlerSubmit(e) {
    e.preventDefault();
    if (this.state.company_name === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.description === '' || this.state.contact_email === '' || this.state.contact_phone === '') {
      window.alert('Please enter all fields');
    } else {
      const fd = new FormData();
      fd.append('emailId', localStorage.getItem('email_id'));
      fd.append('companyName', this.state.company_name);
      fd.append('city', this.state.city);
      fd.append('cstate', this.state.cstate);
      fd.append('country', this.state.country);
      fd.append('description', this.state.description);
      fd.append('contactPhone', this.state.contact_phone);
      fd.append('contact_email', this.state.contact_email);
      fd.append('file', this.state.selectedFile);
      this.props.updateCompanyProfile(fd);
    }
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
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
              <Label for="companyName" sm={2}>Company Name</Label>
              <Col sm={6}>
                <Input type="text" name="company_name" id="companyName" value={this.state.company_name} onChange={this.onChangeHandler} required />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="contactEmail" sm={2}>Contact Email</Label>
              <Col sm={3}>
                <Input type="email" name="contact_email" id="contactEmail" value={this.state.contact_email} onChange={this.onChangeHandler} required />
              </Col>
              <Label for="contactPhone" sm={2}>Contact Phone</Label>
              <Col sm={3}>
                <Input type="number" name="contact_phone" id="contactNumber" value={this.state.contact_phone} onChange={this.onChangeHandler} required />
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
              <Label for="exampleText" sm={2}>Company Description</Label>
              <Col sm={8}>
                <Input type="textarea" name="description" id="exampleText" rows="7" onChange={this.onChangeHandler} value={this.state.description} required />
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

const mapStateToProps = state => ({
  profile: state.profile.companyProfile
});

export default connect(mapStateToProps, { updateCompanyProfile })(Profile);
