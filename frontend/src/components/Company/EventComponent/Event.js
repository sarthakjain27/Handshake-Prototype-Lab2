import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectNav: '',
    };
    console.log(props);
    this.showStudents = this.showStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.capitalizeArray = this.capitalizeArray.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  showStudents(e) {
    e.preventDefault();
    this.setState({
      redirectNav: <Redirect to={{ pathname: '/RegisteredStudentsInEvent', state: { students: this.props.event.registeredStudents, eventId: this.props.event._id } }} />,
    });
  }

  capitalize(word, splitParam = ' ') {
    console.log(word);
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    }
    return '';
  }

  capitalizeArray(arr) {
    console.log(arr);
    return arr.join(', ');
  }

  convertTime(time) {
    const hourMinutes = time.split(':');
    if (hourMinutes[0] < 12) {
      return `${hourMinutes[0]}:${hourMinutes[1]} AM`;
    } if (hourMinutes[0] > 12) {
      return `${hourMinutes[0] - 12}:${hourMinutes[1]} PM`;
    }
    return `${hourMinutes[0]}:${hourMinutes[1]} PM`;
  }

  convertDate(date) {
    const yearMonthDay = date.split('/');
    return `${yearMonthDay[1]}/${yearMonthDay[2]}/${yearMonthDay[0]}`;
  }

  render() {
    return (
      <div>
        {this.state.redirectNav}
        <br />
        <Card border="primary" className="text-center">
          <Card.Body>
            <Card.Title>
              {this.capitalize(this.props.event.name)}
              {' '}
              |
              {' '}
              {this.convertDate(this.props.event.date)}
              {' '}
              |
              {' '}
              {this.convertTime(this.props.event.time)}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Location:</b>
              {' '}
              <i>
                {this.capitalize(this.props.event.street)}
                ,
                {' '}
                {this.capitalize(this.props.event.city)}
                ,
                {' '}
                {this.capitalize(this.props.event.state)}
                ,
                {' '}
                {this.capitalize(this.props.event.country)}
                ,
                {' '}
                {this.capitalize(this.props.event.zipcode)}
              </i>
            </Card.Subtitle>
            <Card.Text>
              {this.props.event.description}
            </Card.Text>
            <Button variant="primary" onClick={this.showStudents}>See Registered Students</Button>
          </Card.Body>
          <Card.Footer>
            <b>Eligible Majors: </b>
            {' '}
            <i>{this.capitalizeArray(this.props.event.eligibility)}</i>
          </Card.Footer>
        </Card>
        <br />
      </div>
    );
  }
}

export default Event;
