import React from 'react';
import { Card, Image, Alert } from 'react-bootstrap';
import {
  Col, Button, FormGroup, Input, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import Dropdown from 'react-dropdown';
import { serverIp, serverPort } from '../../../config';
import { connect } from 'react-redux';
import { searchStudents } from '../../../actions/searchActions';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/react-dropdown/style.css';
import './SearchStudents.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CompanySearchStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      userOption: ['Student Name', 'College Name', 'Skill Name'],
      selectedOption: '',
      searchValue: '',
      noRecord:false,
      currentActivePage:1,
      jobsToShow:5
    };
    this.searchForStudents = this.searchForStudents.bind(this);
    this.onChangeSelectedOptionHandler = this.onChangeSelectedOptionHandler.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.displayStudentsHandler = this.displayStudentsHandler.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.searchStudents({ searchParam: 'ALL' });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.searchResult) {
      var { searchResult } = nextProps;
      if(searchResult.noRecord){
          this.setState({
              noRecord: searchResult.noRecord,
              students:[]
          });
      } else {
          this.setState({
            students:searchResult.studentList
          });
        }
    }
  }

  searchValueChangeHandler(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  onChangeSelectedOptionHandler(e) {
    this.setState({
      selectedOption: e.value,
    });
  }

  displayStudentsHandler() {
    if(this.state.students.length > 0)
    {
      let eachPageJobCards = [], numberOfJobsToShowPerPage = this.state.jobsToShow
      let activePage = this.state.currentActivePage;
      let count = 0;
      for(let i=(activePage-1)*numberOfJobsToShowPerPage;i<this.state.students.length && count < numberOfJobsToShowPerPage;i++,count++){
        let eachStudent = this.state.students[i];
        let imgSrc = `${serverIp}:${serverPort}/default.png`;
        if (eachStudent.profilePictureUrl !== '') {
          imgSrc = `${serverIp}:${serverPort}/${eachStudent.profilePictureUrl}`;
        }
        eachPageJobCards.push(
        <div>
          <div>
            <Card border="primary">
              <Card.Body>
                <Card.Title>
                  <Image
                    src={imgSrc}
                    alt="Profile Picture"
                    roundedCircle
                    style={{ height: 40, width: 40 }}
                  />
                  {' '}
                  {' '}
                  <a href={`/StudentProfile/${eachStudent.emailId}`}>{this.capitalize(eachStudent.name)}</a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {this.capitalize(eachStudent.collegeName)}
                </Card.Subtitle>
                <Card.Text>
                  <b>Career Objective</b>
                  {' '}
                  <br />
                  {eachStudent.careerObjective}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </div>
        </div>)
      }
      return eachPageJobCards;
    } else return [];
  }

  searchForStudents(e) {
    e.preventDefault();
    const data = { value: this.state.searchValue.toLowerCase() };
    if (this.state.selectedOption === '') {
      window.alert('Please select a parameter');
    } else if (this.state.selectedOption !== 'Student Name' && this.state.selectedOption !== 'College Name' && this.state.selectedOption !== 'Skill Name') {
      window.alert('Wrong Paramter Selected');
    } else {
      if (this.state.selectedOption === 'Student Name') {
        data.searchParam = 'Name';
      } else if (this.state.selectedOption === 'College Name') {
        data.searchParam = 'College Name';
      } else if (this.state.selectedOption === 'Skill Name') {
        data.searchParam = 'Skill';
      }
      this.props.searchStudents(data);
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

  handleSearchReset(e) {
    e.preventDefault();
    this.props.searchStudents({ searchParam: 'ALL' });
    this.setState({
      searchValue: '',
      selectedOption: '',
      noRecord:false,
      currentActivePage:1
    });
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    }
    return '';
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
                No Students available right now. Please try again after some time.
                </Alert>
    } else if(this.state.noRecord){
      noRecordFoundMessage = <Alert variant="info">
                No Students matches your criteria. Please try again.
                </Alert>
    }
    let pagesBar = null;
    if(this.state.students.length > 0){
      let totalPageCount = Math.ceil(this.state.students.length / this.state.jobsToShow);
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
                    <form onSubmit={this.searchForStudents} style={{ width: 1200 }}>
                      <FormGroup row>
                        <Col sm={6}>
                          <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            placeholder="Student Name, College Name or Skill Name"
                            value={this.state.searchValue}
                            onChange={this.searchValueChangeHandler}
                            pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
                            title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
                            required
                          />
                        </Col>
                        <Col sm={3}>
                          <Dropdown
                            options={this.state.userOption}
                            onChange={this.onChangeSelectedOptionHandler}
                            value={this.state.selectedOption}
                            placeholder="Given value provided is ?"
                          />
                        </Col>
                        <Col sm={3}>
                          <Button color="primary" style={{ width: 100, height: 40 }}>Search</Button>
                          {' '}
                          <Button color="info" style={{ width: 100, height: 40 }} onClick={this.handleSearchReset}>Reset</Button>
                          {' '}
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
                <div className="col-md-4-SearchStudentsCompany">
                  <div className="experienceHeading">
                    <h2 />
                  </div>
                </div>
                <div className="col-md-8-SearchStudentsCompany">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {noRecordFoundMessage}
                      {this.displayStudentsHandler()}
                      <br />
                      {pagesBar}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-SearchStudentsCompany">
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
  searchResult: state.search.students
});

export default connect(mapStateToProps, { searchStudents })(CompanySearchStudents);
