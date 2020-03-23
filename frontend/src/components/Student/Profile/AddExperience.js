import React from 'react';
import DatePicker from 'react-datepicker';
import {
  Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createExperience } from '../../../actions/profileActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavBar from '../../NavBar/CustomNavBar';

class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      title: '',
      city: '',
      cstate: '',
      country: '',
      startDate: new Date(),
      endDate: new Date(),
      description: ''
    };
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.submitChangeHandler = this.submitChangeHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  startDateChangeHandler(e) {
    this.setState({
      startDate: e,
    });
  }

  endDateChangeHandler(e) {
    this.setState({
      endDate: e,
    });
  }

  submitChangeHandler(e) {
    e.preventDefault();
    if (this.state.companyName === '' || this.state.title === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.description === '' || this.state.startDate === '') {
      window.alert('Please enter all fields');
    } else {
      const data = {
        companyName: this.state.companyName,
        title: this.state.title,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        description: this.state.description,
        startDate: `${this.state.startDate.getFullYear()}/${this.state.startDate.getMonth() + 1}/${this.state.startDate.getDate()}`,
        emailId: localStorage.getItem('email_id')
      };
      if (this.state.endDate === '') {
        data.endDate = '';
      } else {
        data.endDate = `${this.state.endDate.getFullYear()}/${this.state.endDate.getMonth() + 1}/${this.state.endDate.getDate()}`;
      }
      this.props.createExperience(data);
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
          <Form onSubmit={this.submitChangeHandler}>
            <FormGroup row>
              <Label for="companyName" sm={2}>Company Name</Label>
              <Col sm={5}>
                <Input type="text" name="companyName" id="companyName" value={this.state.companyName} onChange={this.onChangeHandler} />
              </Col>
              <Label for="title" sm={1}>Title</Label>
              <Col sm={3}>
                <Input type="text" name="title" id="title" value={this.state.title} onChange={this.onChangeHandler} />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="city" sm={1}>City</Label>
              <Col sm={2}>
                <Input type="text" name="city" id="city" value={this.state.city} onChange={this.onChangeHandler} />
              </Col>
              <Label for="state" sm={1}>State</Label>
              <Col sm={2}>
                <Input type="text" name="cstate" id="state" value={this.state.cstate} onChange={this.onChangeHandler} />
              </Col>
              <Label for="country" sm={1}>Country</Label>
              <Col sm={2}>
                <Input type="text" name="country" id="country" value={this.state.country} onChange={this.onChangeHandler} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="startDate" sm={1}>Start Date</Label>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  selected={this.state.startDate}
                  onChange={this.startDateChangeHandler}
                  required
                />
              </Col>
              <Label for="endDate" sm={1}>End Date</Label>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  selected={this.state.endDate}
                  onChange={this.endDateChangeHandler}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={2}>Work Description</Label>
              <Col sm={8}>
                <Input type="textarea" name="description" id="exampleText" rows="7" onChange={this.onChangeHandler} value={this.state.description} />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 4, offset: 5 }}>
                <Button style={{ width: 150, height: 50 }}>Update</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, { createExperience })(AddExperience);
