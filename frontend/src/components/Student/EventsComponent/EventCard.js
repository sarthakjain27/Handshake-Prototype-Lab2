import React from 'react';
import {
  Card, Button, Image,
} from 'react-bootstrap';
import {
  Tooltip,
} from 'reactstrap';
import { connect } from 'react-redux';
import { registerForEvent } from '../../../actions/eventActions';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
    };
    console.log('-----EventCard Props-----');
    console.log(props);
    console.log(typeof props.event.eligibility);
    //console.log(JSON.parse(props.event.eligibility));
    this.capitalize = this.capitalize.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.registerForEvent = this.registerForEvent.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  onToggle() {
    const currentState = this.state.tooltipOpen;
    this.setState({
      tooltipOpen: !currentState,
    });
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

  registerForEvent(e) {
    e.preventDefault();
    this.props.registerForEvent({ studentId: localStorage.getItem('email_id'), eventId: this.props.event._idEvent })
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    let button = '';
    if (this.props.showRegisterButton) {
      let eligible = false;
      const currentYear = (new Date()).getFullYear();
      let studentEducation = []
      if(JSON.parse(sessionStorage.getItem('educationSetFromListEvents'))!==null){
        studentEducation = JSON.parse(sessionStorage.getItem('educationSetFromListEvents'));
        console.log('---studentEducation in EventCard ---');
        console.log(studentEducation);
        //const eligibilityMajors = this.props.event.eligibility.toLowerCase().split(',');
        const eligibilityMajors = this.props.event.eligibility;
        console.log(eligibilityMajors);
        for (const i of studentEducation) {
          if ((parseInt(i.yearOfPassing) >= currentYear) && (eligibilityMajors.includes(i.major))) {
            eligible = true;
            break;
          }
        }
      }
      if (eligible) {
        button = <Button style={{ width: 100, height: 40 }} onClick={this.registerForEvent}>Register</Button>;
      } else {
        button = (
          <Button variant="danger" style={{ width: 80, height: 58 }} id="TooltipExample">
            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
              You are not eligible since your latest education Major doesn't fall into the eligible category listed by the company.
            </Tooltip>
            Not Eligible
          </Button>
        );
      }
    }
    if(this.props.event.profile_picture_url === '')
    {
      this.props.event.profile_picture_url = '/default.png';
    }
    let companyImgSrc = serverIp+':'+serverPort+'/'+this.props.event.profile_picture_url;
    return (
      <div>
        <br />
        <Card border="primary">
          <Card.Body>
            <Card.Title>
              <Image
                src={`${companyImgSrc}`}
                alt="Company Profile Picture"
                rounded
                style={{ height: 50, width: 50 }}
              />
              {' '}
              {' '}
              {this.capitalize(this.props.event.eventName)}
              {' '}
              |
              {this.capitalize(this.props.event.name)}
              {' '}
              {' '}
              {button}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Posted Date: </b>
              {' '}
              {this.convertDate(this.props.event.date)}
              ,
              {' '}
              {this.convertTime(this.props.event.time)}
            </Card.Subtitle>
            <Card.Text>
              <b>Description</b>
              {' '}
              <br />
              {this.props.event.description}
              {' '}
              <br />
              <b>Eligible Majors: </b>
              {' '}
              <i>{this.props.event.eligibility.join(', ')}</i>
            </Card.Text>
            <Card.Footer>
              <b>Location:</b>
              {' '}
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
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, { registerForEvent })(EventCard);
