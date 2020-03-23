import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteExperience } from '../../../actions/profileActions';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.capitalize = this.capitalize.bind(this);
    this.editExperienceDetails = this.editExperienceDetails.bind(this);
    this.deleteExperienceDetails = this.deleteExperienceDetails.bind(this);
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editExperienceDetails(e) {
    e.preventDefault();
    sessionStorage.setItem('company_name', this.capitalize(this.props.experience.name));
    sessionStorage.setItem('title', this.capitalize(this.props.experience.title));
    sessionStorage.setItem('city', this.capitalize(this.props.experience.city));
    sessionStorage.setItem('state', this.capitalize(this.props.experience.state));
    sessionStorage.setItem('country', this.capitalize(this.props.experience.country));
    sessionStorage.setItem('start_date', this.props.experience.startDate);
    sessionStorage.setItem('end_date', this.props.experience.endDate);
    sessionStorage.setItem('work_description', this.props.experience.workDescription);
    sessionStorage.setItem('experience_id', this.props.experience._id);
    window.location.href = '/editStudentExperience';
  }

  deleteExperienceDetails(e) {
    e.preventDefault();
    this.props.deleteExperience({ experienceId: this.props.experience._id, emailId:localStorage.getItem('email_id') });
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
    let showDate = '';
    if (this.props.experience.end_date === '') {
      showDate = `${this.props.experience.startDate} - Present`;
    } else {
      showDate = `${this.props.experience.startDate} - ${this.props.experience.endDate}`;
    }

    let buttons = '';
    if (this.props.showButtons) {
      buttons = (
        <div>
          <Button variant="primary" onClick={this.editExperienceDetails}>Edit</Button>
          {' '}
          <Button variant="danger" onClick={this.deleteExperienceDetails}>Delete</Button>
        </div>
      );
    }
    return (
      <div>
        <Card border="primary">
          <Card.Body>
            <Card.Title>{this.capitalize(this.props.experience.name)}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.experience.title)}
              {' '}
              |
              {showDate}
              <br />
              {this.capitalize(this.props.experience.city)}
              ,
              {this.capitalize(this.props.experience.state)}
              ,
              {this.capitalize(this.props.experience.country)}
            </Card.Subtitle>
            <Card.Text>
              <b>Work Description: </b>
              {this.props.experience.workDescription}
            </Card.Text>
            {buttons}
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
