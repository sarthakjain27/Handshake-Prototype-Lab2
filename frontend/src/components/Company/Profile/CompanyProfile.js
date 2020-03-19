import React from 'react';
import {
  Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCompanyProfile } from '../../../actions/profileActions';
import { Redirect } from 'react-router';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: '',
      city: '',
      cstate: '',
      country: '',
      description: '',
      contact_phone: '',
      contact_email: '',
      profile_picture_url: '',
      redirectNav: ''
    };
    this.editProfileHandler = this.editProfileHandler.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getCompanyProfile({emailId:localStorage.getItem('email_id')});
    } else {
      this.props.getCompanyProfile({id:this.props.match.params.id});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      var { profile } = nextProps;
      this.setState({
        company_name: profile.name,
        city: profile.city,
        cstate: profile.state,
        country: profile.country,
        description: profile.description,
        contact_phone: profile.contactPhone,
        contact_email: profile.contactEmail,
        profile_picture_url: profile.profilePictureUrl
      },()=>{
        localStorage.setItem('profile_picture_url',this.state.profile_picture_url);
        //window.location.reload();
      });
    }
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editProfileHandler(e) {
    e.preventDefault();
    this.setState({
      redirectNav:<Redirect to='/editCompanyProfile'/>
    });
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let profileSrc = 'default.png';
    if (this.state.profile_picture_url !== '') {
      profileSrc = this.state.profile_picture_url;
    }
    let buttons = '';
    if (!this.props.match.params.id) {
      buttons = (
        <FormGroup check row>
          <Col sm={{ size: 4, offset: 5 }}>
            <Button style={{ width: 150, height: 50 }}>Edit</Button>
          </Col>
        </FormGroup>
      );
    }
    return (
      <div>
        {this.state.redirectNav}
        <div>
          <CustomNavBar />
        </div>
        <br />

        <div>
          <Form onSubmit={this.editProfileHandler}>
            <FormGroup row>
              <Col xs={6} md={4}>
                <Image
                  src={`${serverIp}:${serverPort}/${profileSrc}`}
                  alt="Profile Picture"
                  roundedCircle
                  style={{ height: 200, width: 200 }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="companyName" sm={2}>Company Name</Label>
              <Col sm={6}>
                <Input type="text" name="companyName" id="companyName" value={this.capitalize(this.state.company_name)} disabled />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="contactEmail" sm={2}>Contact Email</Label>
              <Col sm={3}>
                <Input type="email" name="contactEmail" id="contactEmail" value={this.state.contact_email} disabled />
              </Col>
              <Label for="contactPhone" sm={2}>Contact Phone</Label>
              <Col sm={3}>
                <Input type="number" name="contactNumber" id="contactNumber" value={this.state.contact_phone} disabled />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="city" sm={1}>City</Label>
              <Col sm={2}>
                <Input type="text" name="city" id="city" value={this.capitalize(this.state.city)} disabled />
              </Col>
              <Label for="state" sm={1}>State</Label>
              <Col sm={2}>
                <Input type="text" name="state" id="state" value={this.capitalize(this.state.cstate)} disabled />
              </Col>
              <Label for="country" sm={1}>Country</Label>
              <Col sm={2}>
                <Input type="text" name="country" id="country" value={this.capitalize(this.state.country)} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={2}>Company Description</Label>
              <Col sm={8}>
                <Input type="textarea" name="text" id="exampleText" rows="7" value={this.state.description} disabled />
              </Col>
            </FormGroup>
            {buttons}
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.companyProfile
});

export default connect(mapStateToProps, { getCompanyProfile })(CompanyProfile);
