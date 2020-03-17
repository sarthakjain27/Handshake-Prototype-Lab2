import React from 'react';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { getRegisteredEvents } from '../../../actions/eventActions';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/react-dropdown/style.css';
import EventCard from './EventCard';
import './ListEvents.css';

class RegisteredEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredEvents: [],
      noRecord:false,
      currentActivePage:1,
      jobsToShow:3
    };
    this.returnEventsCards = this.returnEventsCards.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.getRegisteredEvents({emailId: localStorage.getItem('email_id')});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult) {
      var { searchResult } = nextProps;

      if(searchResult.noRecord){
          this.setState({
              noRecord: searchResult.noRecord,
              registeredEvents: []
          });
      } else {
          this.setState({
            registeredEvents: searchResult.eventList
          });
        }
    }
  }

  returnEventsCards() {
    if(this.state.registeredEvents.length > 0){
      let eachPageJobCards = [], numberOfJobsToShowPerPage = this.state.jobsToShow
      let activePage = this.state.currentActivePage;
      let count = 0;
      for(let i=(activePage-1)*numberOfJobsToShowPerPage;i<this.state.registeredEvents.length && count < numberOfJobsToShowPerPage;i++,count++){
        eachPageJobCards.push(<EventCard event={this.state.registeredEvents[i]} key={i} showRegisterButton={false}/>)
      }
      return eachPageJobCards;
    } else return [];
  }

  onPageChange(e){
    console.log(e.target.value);
    let currentPage = this.state.currentActivePage;
    if (e.target.value === "next" ) {
      currentPage += 1;
    } else if (e.target.value === "prev") {
      currentPage -= 1;
    } else if(currentPage!==parseInt(e.target.value)) {
        currentPage = parseInt(e.target.value);
    } else return;
    this.setState({
        currentActivePage: currentPage
    });
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let noRecordFoundMessage = "";
    if(this.state.noRecord){
      noRecordFoundMessage = <Alert variant="info">
                You have not registered for any Events yet.
                </Alert>
    } 
    let pagesBar = null;
    if(this.state.registeredEvents.length > 0){
      let totalPageCount = Math.ceil(this.state.registeredEvents.length / this.state.jobsToShow);
      let allPages = []
      for(let i=1; i<=totalPageCount;i++){
        allPages.push(
          <PaginationItem active={i===this.state.currentActivePage}>
          <PaginationLink name={i} value={i} onClick={this.onPageChange}>
            {i}
            </PaginationLink>
          </PaginationItem>);
      }
      pagesBar = <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={this.state.currentActivePage===1}>
                      <PaginationLink previous name="prev" value="prev" onClick={this.onPageChange} />
                    </PaginationItem> 
                    {allPages}
                    <PaginationItem disabled={this.state.currentActivePage===totalPageCount}>
                      <PaginationLink next name="next" value="next" onClick={this.onPageChange} />
                    </PaginationItem>
                  </Pagination>
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
                <div className="col-md-4-RegisteredEvents">
                  <div className="experienceHeading">
                    <h2 />
                  </div>
                </div>
                <div className="col-md-8-RegisteredEvents">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {noRecordFoundMessage}
                      {this.returnEventsCards()}
                      <br />
                      {pagesBar}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-RegisteredEvents">
                  <div className="experienceHeading">
                    <h2 />
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

const mapStateToProps = state => ({
  searchResult: state.event.events
});

export default connect(mapStateToProps, { getRegisteredEvents })(RegisteredEvents);
