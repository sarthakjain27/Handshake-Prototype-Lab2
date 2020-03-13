import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import Event from './Event';
import { Alert } from 'react-bootstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';
import { listCreatedEvents } from '../../../actions/eventActions';

class ListEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      numberOfJobsToShowPerPage:5,
      currentActivePage:1
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.listCreatedEvents({emailId:localStorage.getItem('email_id')});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.postedEvents) {
      var { postedEvents } = nextProps;
      if(postedEvents.noRecord){
          this.setState({
              noRecord: postedEvents.noRecord
          });
      } else {
          this.setState({
            events: postedEvents.eventList
          });
        }
    }
  }

  eventList() {
    if(this.state.events.length > 0){
      let eachPageJobCards = [];
      let count = 0;
      let activePage = this.state.currentActivePage;
      for(let i=(activePage-1)*this.state.numberOfJobsToShowPerPage;i<this.state.events.length && count < this.state.numberOfJobsToShowPerPage;i++,count++){
        eachPageJobCards.push(<Event event={this.state.events[i]} key={this.state.events[i].event_id}/>)
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
                You have not made any Job Postings.
                </Alert>
    } 
    let pagesBar = null;
    if(this.state.events.length > 0) {
      let totalPageCount = Math.ceil(this.state.events.length / this.state.numberOfJobsToShowPerPage);
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
                <div className="col-md-4-ListEvents">
                  <div className="experienceHeading">
                    <h2 />
                  </div>
                </div>
                <div className="col-md-8-ListEvents">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {noRecordFoundMessage}
                      {this.eventList()}
                      <br />
                      {pagesBar}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-ListEvents">
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
  postedEvents: state.event.events
});

export default connect(mapStateToProps, { listCreatedEvents })(ListEvents);
