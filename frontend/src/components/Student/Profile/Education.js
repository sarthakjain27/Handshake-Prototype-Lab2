import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteEducation } from '../../../actions/profileActions';

class Education extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.capitalize = this.capitalize.bind(this);
    this.editEducationDetails = this.editEducationDetails.bind(this);
    this.deleteEducationDetails = this.deleteEducationDetails.bind(this);
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editEducationDetails(e) {
    e.preventDefault();
    sessionStorage.setItem('college_name', this.capitalize(this.props.education.name));
    sessionStorage.setItem('city', this.capitalize(this.props.education.city));
    sessionStorage.setItem('state', this.capitalize(this.props.education.state));
    sessionStorage.setItem('country', this.capitalize(this.props.education.country));
    sessionStorage.setItem('degree', this.capitalize(this.props.education.degree));
    sessionStorage.setItem('major', this.capitalize(this.props.education.major));
    sessionStorage.setItem('year_of_passing', this.props.education.yearOfPassing);
    sessionStorage.setItem('cgpa', this.props.education.cgpa);
    sessionStorage.setItem('education_id', this.props.education._id);
    window.location.href = '/editStudentEducation';
  }

  deleteEducationDetails(e) {
    e.preventDefault();
    this.props.deleteEducation({educationId: this.props.education._id,emailId:localStorage.getItem('email_id')});
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
    let buttons = '';
    if (this.props.showButtons) {
      buttons = (
        <div>
          <Button variant="primary" onClick={this.editEducationDetails}>Edit</Button>
          {' '}
          <Button variant="danger" onClick={this.deleteEducationDetails}>Delete</Button>
        </div>
      );
    }
    return (
      <div>
        <Card border="primary">
          <Card.Body>
            <Card.Title>{this.capitalize(this.props.education.name)}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.education.degree)}
              ,
              {this.capitalize(this.props.education.major)}
              {' '}
              <br />
              {this.capitalize(this.props.education.city)}
              ,
              {this.capitalize(this.props.education.state)}
              ,
              {this.capitalize(this.props.education.country)}
            </Card.Subtitle>
            <Card.Text>
              <b>CGPA: </b>
              {this.capitalize(this.props.education.cgpa)}
              {' '}
              <br />
              <b>Year of Passing: </b>
              {this.capitalize(this.props.education.yearOfPassing)}
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

export default connect(mapStateToProps, { deleteEducation })(Education);
