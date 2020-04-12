import React from 'react';
import {
  Col, Button, Input,
  Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { connect } from 'react-redux';
import '../../../../node_modules/react-dropdown/style.css';
import { Alert } from 'react-bootstrap';

import EventCard from './EventCard';
import './ListEvents.css';
import { searchEvent } from '../../../actions/eventActions';
import { getStudentAllEducation } from '../../../actions/profileActions';

class StudentListEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      filteredEvents: [],
      noRecord: false,
      currentActivePage: 1,
      jobsToShow: 3,
    };
    this.returnEventsCards = this.returnEventsCards.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.findEventsSearchHandler = this.findEventsSearchHandler.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.getStudentAllEducation({ emailId: localStorage.getItem('email_id') });
    this.props.searchEvent({ emailId: localStorage.getItem('email_id') });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult) {
      const { searchResult } = nextProps;

      if (searchResult.noRecord) {
        this.setState({
          noRecord: searchResult.noRecord,
          filteredEvents: [],
        });
      } else {
        this.setState({
          filteredEvents: searchResult.eventList,
        });
      }
    }
  }

  returnEventsCards() {
    if (this.state.filteredEvents.length > 0) {
      const eachPageJobCards = []; const
        numberOfJobsToShowPerPage = this.state.jobsToShow;
      const activePage = this.state.currentActivePage;
      let count = 0;
      for (let i = (activePage - 1) * numberOfJobsToShowPerPage; i < this.state.filteredEvents.length && count < numberOfJobsToShowPerPage; i++, count++) {
        eachPageJobCards.push(<EventCard event={this.state.filteredEvents[i]} key={i} showRegisterButton />);
      }
      return eachPageJobCards;
    } return [];
  }

  searchValueChangeHandler(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.props.searchEvent({});
    this.setState({
      searchValue: '',
      noRecord: false,
    });
  }

  findEventsSearchHandler(e) {
    e.preventDefault();
    const data = {
      eventName: this.state.searchValue,
    };
    this.props.searchEvent(data);
  }

  onPageChange(e) {
    console.log(e.target.value);
    let currentPage = this.state.currentActivePage;
    if (e.target.value === 'next') {
      currentPage += 1;
    } else if (e.target.value === 'prev') {
      currentPage -= 1;
    } else if (currentPage !== parseInt(e.target.value)) {
      currentPage = parseInt(e.target.value);
    } else return;
    this.setState({
      currentActivePage: currentPage,
    });
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let noRecordFoundMessage = '';
    if (this.state.noRecord) {
      noRecordFoundMessage = (
        <Alert variant="info">
          No Event Postings available right now. Please try again after some time.
        </Alert>
      );
    }
    let pagesBar = null;
    if (this.state.filteredEvents.length > 0) {
      const totalPageCount = Math.ceil(this.state.filteredEvents.length / this.state.jobsToShow);
      const allPages = [];
      for (let i = 1; i <= totalPageCount; i++) {
        allPages.push(
          <PaginationItem active={i === this.state.currentActivePage}>
            <PaginationLink name={i} value={i} onClick={this.onPageChange}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
      pagesBar = (
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={this.state.currentActivePage === 1}>
            <PaginationLink previous name="prev" value="prev" onClick={this.onPageChange} />
          </PaginationItem>
          {allPages}
          <PaginationItem disabled={this.state.currentActivePage === totalPageCount}>
            <PaginationLink next name="next" value="next" onClick={this.onPageChange} />
          </PaginationItem>
        </Pagination>
      );
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div>
          <div className="main-div-studentProfile">
            <div className="main-relative-div-studentProfile">
              <div className="row">
                <div className="col-md-4">
                  <div className="experienceHeading">
                    <h2>Search Events</h2>
                  </div>
                  <form onSubmit={this.findEventsSearchHandler}>
                    <Input type="text" name="searchEvent" id="searchEvent" placeholder="Search Event" value={this.state.searchValue} onChange={this.searchValueChangeHandler} required />
                    {' '}
                    <br />
                    <Col sm={{ offset: 2 }}>
                      <Button color="primary" style={{ width: 100, height: 40 }}>Search</Button>
                      {' '}
                      <Button color="info" style={{ width: 100, height: 40 }} onClick={this.handleReset}>Reset</Button>
                    </Col>
                  </form>
                </div>
                <div className="col-md-8">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {noRecordFoundMessage}
                      {this.returnEventsCards()}
                      <br />
                      {pagesBar}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResult: state.event.events,
});

export default connect(mapStateToProps, { searchEvent, getStudentAllEducation })(StudentListEvents);
