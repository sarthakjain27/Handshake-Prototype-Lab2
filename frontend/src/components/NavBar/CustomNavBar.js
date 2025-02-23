import React from 'react';
import {
  Navbar, Nav, NavDropdown, Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { serverIp, serverPort } from '../../config';
import { userLogout } from '../../actions/loginAction';

class CustomNavBar extends React.Component {
  constructor() {
    super();
    this.onSelectNavHandler = this.onSelectNavHandler.bind(this);
  }

  onSelectNavHandler(e) {
    if (e === 'logOut') {
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.props.userLogout();
      window.location.href = '/';
    }
  }

  render() {
    const profile_src = localStorage.getItem('profile_picture_url');
    let navBar;
    if (localStorage.getItem('userRole') === 'company') {
      navBar = (
        <Navbar bg="primary" variant="dark" onSelect={this.onSelectNavHandler}>
          <Navbar.Brand href="/listPostings">
            <Image
              src={`${serverIp}:${serverPort}/handshakeLogo.png`}
              alt="HandShake Logo"
              roundedCircle
              style={{ height: 40, width: 40 }}
            />
          </Navbar.Brand>
          <Nav className="ml-auto mr-5">
            <Nav.Link href="/newJobPost">Post Opening</Nav.Link>
            <Nav.Link href="/searchStudents">Search Students</Nav.Link>
            <Nav.Link href="/companyMessages">Messages</Nav.Link>
            <NavDropdown title="Events" id="nav-dropdown">
              <NavDropdown.Item href="/listEvents">List Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/newEventPost">Create Event</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={(
                <Image
                  src={`${serverIp}:${serverPort}/${profile_src}`}
                  alt="Profile Picture"
                  roundedCircle
                  style={{ height: 30, width: 30 }}
                />
                      )}
              id="nav-dropdown"
            >
              <NavDropdown.Item href="/companyProfile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="logOut">LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      );
    } else if (localStorage.getItem('userRole') === 'student') {
      navBar = (
        <Navbar bg="primary" variant="dark" onSelect={this.onSelectNavHandler}>
          <Navbar.Brand href="/viewPostedJobs">
            <Image
              src={`${serverIp}:${serverPort}/handshakeLogo.png`}
              alt="HandShake Logo"
              roundedCircle
              style={{ height: 40, width: 40 }}
            />
          </Navbar.Brand>
          <Nav className="ml-auto mr-5">
            <Nav.Link href="/appliedJobs">Applications</Nav.Link>
            <Nav.Link href="/studentSearchStudents">Search Students</Nav.Link>
            <Nav.Link href="/studentMessages">Messages</Nav.Link>
            <NavDropdown title="Events" id="basic-nav-dropdown">
              <NavDropdown.Item href="/listEventsStudent">Upcoming Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/registeredEvents">Your Events</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={(
                <Image
                  src={`${serverIp}:${serverPort}/${profile_src}`}
                  alt="Profile Picture"
                  roundedCircle
                  style={{ height: 30, width: 30 }}
                />
                      )}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/studentProfile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="logOut">LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      );
    } else {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
    return (
      <div>
        {navBar}
      </div>
    );
  }
}

export default connect(null, { userLogout })(CustomNavBar);
