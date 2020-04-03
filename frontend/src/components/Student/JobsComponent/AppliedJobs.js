import React from 'react';
import './AppliedJobs.css';
import Dropdown from 'react-dropdown';
import {
  Col, Button, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { Alert } from 'react-bootstrap';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { connect } from 'react-redux';
import EachJobCard from './eachJobCard';
import '../../../../node_modules/react-dropdown/style.css';
import { listAppliedJobs } from '../../../actions/jobActions';

class AppliedJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredJobs: [],
      allJobs: [],
      categoryOptions: ['Pending', 'Reviewed', 'Declined'],
      selectedCategoryFilter: '',
      noRecord:false,
      currentActivePage:1,
      jobsToShow:3
    };
    this.appliedJobs = this.appliedJobs.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.onChangeSelectedCategoryHandler = this.onChangeSelectedCategoryHandler.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.listAppliedJobs({emailId: localStorage.getItem('email_id')});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult) {
      var { searchResult } = nextProps;
      if(searchResult.noRecord){
          this.setState({
              noRecord: searchResult.noRecord
          });
      } else {
          this.setState({
            allJobs: searchResult.jobList,
            filteredJobs: searchResult.jobList
          });
        }
    }
  }

  onChangeSelectedCategoryHandler(e) {
    this.setState({
      selectedCategoryFilter: e.value,
    });
  }

  appliedJobs() {
    if(this.state.filteredJobs.length > 0){
      let eachPageJobCards = [], numberOfJobsToShowPerPage = this.state.jobsToShow
      let activePage = this.state.currentActivePage;
      let count = 0;
      for(let i=(activePage-1)*numberOfJobsToShowPerPage;i<this.state.filteredJobs.length && count < numberOfJobsToShowPerPage;i++,count++){
        eachPageJobCards.push(<EachJobCard job={this.state.filteredJobs[i]} key={i}/>)
      }
      return eachPageJobCards;
    } else return [];
  }

  handleReset(e) {
    e.preventDefault();
    const { allJobs } = this.state;
    this.setState({
      selectedCategoryFilter: '',
      filteredJobs: allJobs,
      noRecord:false
    });
  }

  handleApplyFilter(e) {
    e.preventDefault();
    // window.alert(`${this.state.selectedCategoryFilter}`);
    console.log(`${this.state.selectedCategoryFilter}`);
    let category = '';
    if (this.state.selectedCategoryFilter === 'Pending') category = 'pending';
    else if (this.state.selectedCategoryFilter === 'Reviewed') category = 'reviewed';
    else if (this.state.selectedCategoryFilter === 'Declined') category = 'declined';
    if (category === '') {
      const { allJobs } = this.state;
      this.setState({
        filteredJobs: allJobs,
      });
    } else {
      let filteredJobArray = [];
      filteredJobArray = this.state.allJobs.filter((eachJob) => eachJob.status.toUpperCase() === category.toUpperCase());
      this.setState({
        filteredJobs: filteredJobArray,
      });
    }
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
      window.location.href = '/';
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let noRecordFoundMessage = "";
    if(this.state.noRecord){
      noRecordFoundMessage = <Alert variant="info">
                You have not applied to any jobs yet!
                </Alert>
    } 
    let pagesBar = null;
    if(this.state.filteredJobs.length > 0){
      let totalPageCount = Math.ceil(this.state.filteredJobs.length / this.state.jobsToShow);
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
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <div className="experienceHeading">
                  <h2>Apply Filters</h2>
                </div>
                <form onSubmit={this.handleApplyFilter}>
                  <div className="educationCard">

                    <Dropdown
                      options={this.state.categoryOptions}
                      onChange={this.onChangeSelectedCategoryHandler}
                      value={this.state.selectedCategoryFilter}
                      placeholder="Select Application Status..."
                    />
                  </div>
                  <Col sm={{ offset: 2 }}>
                    <Button color="primary" style={{ width: 100, height: 50 }}>Filter</Button>
                    {' '}
                    <Button color="info" style={{ width: 100, height: 50 }} onClick={this.handleReset}>Reset</Button>
                  </Col>

                </form>
              </div>
              <div className="col-md-8">
                <div className="educationCard">
                  <div className="experienceHeading">
                    {noRecordFoundMessage}
                    {this.appliedJobs()}
                    <br />
                    {pagesBar}
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
  searchResult: state.job.jobs
});

export default connect(mapStateToProps, { listAppliedJobs })(AppliedJobs);
