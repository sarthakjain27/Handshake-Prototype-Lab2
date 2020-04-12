import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import Select from 'react-select';
import {
  Col, FormGroup, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createEvent } from '../../../actions/eventActions';
import { updateApplyForJobStatus } from '../../../actions/jobActions';
import { CREATE_EVENT } from '../../../actions/types';
import CustomNavBar from '../../NavBar/CustomNavBar';
import './NewEventPost.css';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../../../node_modules/react-dropdown/style.css';

class NewEventPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      description: '',
      date: new Date(),
      street: '',
      city: '',
      cstate: '',
      country: '',
      zipcode: '',
      time: '',
      selectedMajors: [],
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
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.timeChangeHandler = this.timeChangeHandler.bind(this);
    this.eligibilityChangeHandler = this.eligibilityChangeHandler.bind(this);
    this.onSubmitCreateEvent = this.onSubmitCreateEvent.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  dateChangeHandler(e) {
    this.setState({
      date: e,
    });
  }

  timeChangeHandler(e) {
    this.setState({
      time: e,
    });
  }

  eligibilityChangeHandler(e) {
    if (e === null) {
      this.setState({
        selectedMajors: [],
      });
    } else {
      this.setState({
        selectedMajors: e,
      });
    }
  }

  onSubmitCreateEvent(e) {
    e.preventDefault();
    if (this.state.eventName === '' || this.state.description === '' || this.state.street === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.zipcode === '' || this.state.time === '' || this.state.selectedMajors.length === 0) {
      window.alert('Please fill all details. Make sure you select atleast one of the major');
    } else {
      let formattedDate = this.state.date.getFullYear();
      // getMonth() returns 0 based answer
      if (this.state.date.getMonth() < 9) {
        formattedDate = `${formattedDate}/0${this.state.date.getMonth() + 1}`;
      } else {
        formattedDate = `${formattedDate}/${this.state.date.getMonth() + 1}`;
      }

      if (this.state.date.getDate() < 10) {
        formattedDate = `${formattedDate}/0${this.state.date.getDate()}`;
      } else {
        formattedDate = `${formattedDate}/${this.state.date.getDate()}`;
      }

      const selectedM = [];
      this.state.selectedMajors.forEach((eachObj) => {
        selectedM.push(eachObj.value);
      });
      const data = {
        eventName: this.state.eventName,
        description: this.state.description,
        street: this.state.street,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        zipcode: this.state.zipcode,
        companyId: localStorage.getItem('company_id'),
        time: this.state.time, // time goes like military hours 13:00, 14:00, 16:00 see Event.js of company to convert in AM/PM
        date: formattedDate,
        // eligibility: JSON.stringify(selectedM),
        eligibility: selectedM,
        emailId: localStorage.getItem('email_id'),
      };
      console.log(data);
      this.props.createEvent(data);
    }
  }


  render() {
    if (!localStorage.getItem('userRole')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
    if (this.props.status.error || this.props.status.success) {
      if (this.props.status.error) {
        this.props.updateApplyForJobStatus({ type: CREATE_EVENT, value: {} });
        window.alert('Error in creating the given Event');
      } else if (this.props.status.success) {
        window.alert('Successfully created the given Event Posting');
        window.location.href = '/listEvents';
      }
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div className="container">
          <div>
            <div className="main-div-createJobPost-NewEventPost">
              <div className="login-form">
                <h2>Event Details</h2>
              </div>
              <form onSubmit={this.onSubmitCreateEvent}>
                <FormGroup row>
                  <Col sm={10}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="eventName"
                        placeholder="Event Name"
                        pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
                        title="Event Name can only contain letters, digits and single space character. It must start with alphanumeric characters only."
                        onChange={this.onChangeHandler}
                        required
                        autoFocus
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Event Details: </Label>
                  <Col sm={8}>
                    <textarea
                      rows="8"
                      cols="70"
                      name="description"
                      placeholder="Event Description"
                      onChange={this.onChangeHandler}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>Event Date: </Label>
                  <Col sm={4}>
                    <DatePicker
                      className="form-control"
                      selected={this.state.date}
                      onChange={this.dateChangeHandler}
                      required
                    />
                  </Col>
                  <Label sm={2}>Event Time: </Label>
                  <Col sm={4}>
                    <TimePicker
                      onChange={this.timeChangeHandler}
                      value={this.state.time}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={8}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        placeholder="Event Street"
                        pattern="^[a-zA-Z0-9]+([ .,]{*}[a-zA-Z0-9]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="zipcode"
                        placeholder="Zipcode"
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={3}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Event City"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={1} />
                  <Col sm={3}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="cstate"
                        placeholder="Event State"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={1} />
                  <Col sm={3}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Event Country"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>

                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Select Eligibility: </Label>
                  <Col sm={6}>
                    <Select
                      isMulti
                      required
                      onChange={this.eligibilityChangeHandler}
                      options={this.state.allMajors}
                      value={this.state.selectedMajors}
                    />
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ offset: 5 }}>
                    <button type="submit" className="btn btn-primary">Create Event</button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.event.createEvent,
});

export default connect(mapStateToProps, { createEvent, updateApplyForJobStatus })(NewEventPost);
