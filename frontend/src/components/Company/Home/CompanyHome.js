import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import Post from './Post';
import { Alert } from 'react-bootstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';
import { listCreatedJobs } from '../../../actions/jobActions';

class CompanyHome extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      postings:[],
      numberOfJobsToShowPerPage:5,
      currentActivePage:1
    }
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentWillMount(){
    this.props.listCreatedJobs({emailId:localStorage.getItem('email_id')});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.postedJobs) {
      var { postedJobs } = nextProps;
      if(postedJobs.noRecord){
          this.setState({
              noRecord: postedJobs.noRecord
          });
      } else {
          this.setState({
            postings: postedJobs.jobList
          });
        }
    }
  }

  jobList(){
    if(this.state.postings.length > 0){
      let eachPageJobCards = [];
      let count = 0;
      let activePage = this.state.currentActivePage;
      for(let i=(activePage-1)*this.state.numberOfJobsToShowPerPage;i<this.state.postings.length && count < this.state.numberOfJobsToShowPerPage;i++,count++){
        eachPageJobCards.push(<Post post={this.state.postings[i]} key={this.state.postings[i]._id}/>)
      }
      return eachPageJobCards;
    }
    else return [];
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
    if(this.state.postings.length > 0) {
      let totalPageCount = Math.ceil(this.state.postings.length / this.state.numberOfJobsToShowPerPage);
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
                <div className="col-md-4-CompanyHome">
                  <div className="experienceHeading">
                    <h2></h2>
                  </div>
                </div>
                <div className="col-md-8-CompanyHome">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {noRecordFoundMessage}
                      {this.jobList()}
                      <br />
                      {pagesBar}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-CompanyHome">
                  <div className="experienceHeading">
                    <h2></h2>
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
  postedJobs: state.job.jobs
});

export default connect(mapStateToProps, { listCreatedJobs })(CompanyHome);