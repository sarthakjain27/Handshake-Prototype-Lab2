import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { connect } from 'react-redux';
import './StudentHome.css';
// reactstrap button submits the form
import {Col, Button, FormGroup, Input} from 'reactstrap';
import { Alert } from 'react-bootstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Dropdown from 'react-dropdown';
import '../../../../node_modules/react-dropdown/style.css';
import Job from './Job';
import { searchJob } from '../../../actions/jobActions';

class StudentHome extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      selectedOption:'',
      userOptions:['Company Name','Job Title'],
      categoryOptions:['Full Time','Part Time','On Campus','Internship'],
      selectedCategoryFilter:'',
      filteredCity:'',
      noRecord:false,
      currentActivePage:1,
      jobsToShow:5
    }
    this.findJobsHandler = this.findJobsHandler.bind(this);
    this.onChangeSelectedOptionHandler = this.onChangeSelectedOptionHandler.bind(this);
    this.findJobsSearchHandler = this.findJobsSearchHandler.bind(this);
    this.onChangeSelectedCategoryHandler = this.onChangeSelectedCategoryHandler.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
  }

  /*
    filtered jobs is when filters like category (Full time, Part time, On Campus, Internship) and location (city)
    are applied on allJobs so no backend post request is made. 
    On the front end itself filter jobs from allJobs and put into filteredJobs
    always show jobs to user from filteredJobs array
  */
  componentDidMount(){
    this.props.searchJob({});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult) {
      var { searchResult } = nextProps;

      if(searchResult.noRecord){
          this.setState({
              noRecord: searchResult.noRecord,
              allJobs:[],
              filteredJobs:[]
          });
      } else {
          this.setState({
            allJobs: searchResult.jobList,
            filteredJobs: searchResult.jobList
          });
        }
    }
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  onChangeSelectedOptionHandler(e){
    this.setState({
      selectedOption:e.value
    });
  }

  onChangeSelectedCategoryHandler(e){
    this.setState({
      selectedCategoryFilter:e.value
    })
  }

  findJobsHandler(){
    if(this.state.filteredJobs){
      let eachPageJobCards = [], numberOfJobsToShowPerPage = this.state.jobsToShow
      let activePage = this.state.currentActivePage;
      let count = 0;
      for(let i=(activePage-1)*numberOfJobsToShowPerPage;i<this.state.filteredJobs.length && count < numberOfJobsToShowPerPage;i++,count++){
        eachPageJobCards.push(<Job job={this.state.filteredJobs[i]} key={this.state.filteredJobs[i]._id}/>)
      }
      return eachPageJobCards;
    } else return [];
  }

  findJobsSearchHandler(e){
    e.preventDefault();
    if(this.state.selectedOption!=='Company Name' && this.state.selectedOption!=='Job Title'){
      window.alert('Please select category from dropdown');
    } else {
      const data = {};
      if(this.state.selectedOption === 'Company Name'){
        data['companyName'] = this.state.searchValue;
      } else if(this.state.selectedOption === 'Job Title'){
        data['title'] = this.state.searchValue;
      }
      this.props.searchJob(data);
    }
  }

  handleApplyFilter(e){
    e.preventDefault();
    //window.alert(`${this.state.selectedCategoryFilter} | ${this.state.filteredCity}`);
    let category = '';
    if(this.state.selectedCategoryFilter === 'Full Time')
      category = 'full time';
    else if(this.state.selectedCategoryFilter === 'Part Time')
      category = 'part time';
    else if(this.state.selectedCategoryFilter === 'On Campus')
      category = 'on campus';
    else if(this.state.selectedCategoryFilter === 'Internship')
      category = 'intern';
    if((category === '') && (this.state.filteredCity === '')){
      this.setState({
        filteredJobs:this.state.allJobs
      });
    } else if(this.state.filteredCity !== '') {
      let filteredJobArray = '';
      if(category === '')
      {
        filteredJobArray = this.state.allJobs.filter(eachJob => eachJob.city.toUpperCase() === this.state.filteredCity.toUpperCase());
      }
      else {
        filteredJobArray = this.state.allJobs.filter(eachJob => ((eachJob.city.toUpperCase() === this.state.filteredCity.toUpperCase()) && (eachJob.category === category)));
      }
      this.setState({
        filteredJobs:filteredJobArray
      });
    } else {
      let filteredJobArray = '';
      filteredJobArray = this.state.allJobs.filter(eachJob => eachJob.category === category);
      this.setState({
        filteredJobs:filteredJobArray
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

  handleReset(e){
    e.preventDefault();
    const { allJobs } = this.state;
    this.setState({
      filteredJobs: allJobs,
      selectedCategoryFilter: '',
      filteredCity: '',
      currentActivePage:1
    });
  }

  handleSearchReset(e) {
    e.preventDefault();
    this.props.searchJob({});
    this.setState({
      searchValue: '',
      selectedOption: '',
      selectedCategoryFilter:'',
      filteredCity:'',
      currentActivePage:1
    })
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let noRecordFoundMessage = "";
    if(this.state.searchValue === "" && this.state.noRecord){
      noRecordFoundMessage = <Alert variant="info">
                No Job Postings available right now. Please try again after some time.
                </Alert>
    } else if(this.state.noRecord){
      noRecordFoundMessage = <Alert variant="info">
                No Job Postings matches your criteria. Please try again.
                </Alert>
    }

    let pagesBar = null;
    if(this.state.filteredJobs){
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
        <div data-hook="container" className="style__container___15r1p style__large___3HKaH ">
          
            <div id="postingsFilters">
              <div data-hook="quick-filters">
                <div className="style__card___1rhof style__fitted___5wNfd" data-hook="card">
                  <div className="style__card-item___B1f7m style__medium___2atZe">
                    <div className="style__input-fields___3mtFs">
                      <form onSubmit={this.findJobsSearchHandler} style={{width:1200}}>
                        <FormGroup row>
                          <Col sm={6}>
                            <Input type="text" name="companyName" id="companyName" 
                                    placeholder="Company Name or Title" 
                                    value={this.state.searchValue} 
                                    name="searchValue"
                                    onChange={this.onChange} 
                                    pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                    title="It can only contain letters, single space character and period. It must start with letter and cannot end with special character"
                                    required/>
                          </Col>
                          <Col sm={3}>
                            <Dropdown
                                options={this.state.userOptions}
                                onChange={this.onChangeSelectedOptionHandler}
                                value={this.state.selectedOption}
                                placeholder="Given Search Is.."
                                required
                            />
                          </Col>
                          <Col sm={3}>
                            <Button color="primary" style={{width:100,height:40}}>Search</Button>
                            {' '}
                          <Button color="info" style={{ width: 100, height: 40 }} onClick={this.handleSearchReset}>Reset</Button>
                          </Col>
                        </FormGroup>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
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
                          placeholder='Select Job Category'
                        />
                      </div>
                      <div className="educationCard">
                        <Input type="text" name="filteredCity" id="cityFilter" placeholder="City Filter" value={this.state.filteredCity} onChange={this.onChange}/>
                      </div>
                      <Button color="primary" style={{width:150,height:50}}>Filter</Button>
                    </form>
                  </div>
                  <div className="col-md-8">
                    <div className="educationCard">
                      <div className="experienceHeading">
                        {noRecordFoundMessage}
                        {this.findJobsHandler()}
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

const mapStateToProps = state => ({
  searchResult: state.job.jobs
});

export default connect(mapStateToProps, { searchJob })(StudentHome);
