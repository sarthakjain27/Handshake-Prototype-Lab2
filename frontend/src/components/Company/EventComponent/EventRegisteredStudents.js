import React from 'react';
import {
  Card, Modal, Image, Alert
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfileAppliedInEvent } from '../../../actions/profileActions';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './NewEventPost.css';

class EventRegisteredStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredStudents: [],
      registeredStudentsProfile:[],
      numberOfJobsToShowPerPage:5,
      currentActivePage:1,
      noRecord:false
    };
    this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  // Constructor -> ComponentWillMount -> Render -> ComponentDidMount
  componentDidMount(){
    console.log('EventRegisteredStudents Component Did Mount got called');
    if(this.props.location.state.students.length > 0){
      this.setState({
        registeredStudents:this.props.location.state.students
      },()=>{
        this.props.getStudentProfileAppliedInEvent(this.state.registeredStudents);
      })
    }else this.setState({
      noRecord:true
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('In EventRegisteredStudents componentWillReceiveProps');
    console.log(nextProps);
    if(nextProps.registeredStudentsProfile){
      var { registeredStudentsProfile } = nextProps;
      if(registeredStudentsProfile.registeredStudents.length === 0){
          this.setState({
              noRecord: true
          });
      } else {
          this.setState({
            registeredStudentsProfile: registeredStudentsProfile.registeredStudents
          });
        }
    }
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    }
    return '';
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

  returnRegisteredStudents() {
    if(this.state.registeredStudentsProfile.length > 0){
      let eachPageJobCards = [];
      let count = 0;
      let activePage = this.state.currentActivePage;
      for(let i=(activePage-1)*this.state.numberOfJobsToShowPerPage;i<this.state.registeredStudentsProfile.length && count < this.state.numberOfJobsToShowPerPage;i++,count++){
        let eachStudent = this.state.registeredStudentsProfile[i];
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
                      alt="Student Profile Picture"
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
            <div>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {this.capitalize(eachStudent.name)}
                    {' '}
                    <Image
                      src={`${serverIp}:${serverPort}/${eachStudent.profilePictureUrl}`}
                      alt="Student Profile Picture"
                      roundedCircle
                      style={{ height: 50, width: 50 }}
                    />
                    {' '}
                    <br />

                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <b>College Name: </b>
                  {this.capitalize(eachStudent.name)}
                  {' '}
                  <br />
                  <b>Career Objective </b>
                  {' '}
                  <br />
                  {eachStudent.careerObjective}
                  {' '}
                  <br />
                  {' '}
                  <br />
                  <b>Location: </b>
                  {' '}
                  <i>
                    {this.capitalize(eachStudent.city)}
                    ,
                    {' '}
                    {this.capitalize(eachStudent.state)}
                    ,
                    {' '}
                    {this.capitalize(eachStudent.country)}
                  </i>
                  {' '}
                  <br />
                  <b>Contact Phone: </b>
                  {' '}
                  <i>{eachStudent.contactPhone}</i>
                  {' '}
                  <br />
                  <b>Contact Email: </b>
                  {' '}
                  <i>{eachStudent.contactEmail}</i>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        );
      }
      return eachPageJobCards;
    } else return [];
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
                No Student have applied for this job yet.
                </Alert>
    }
    let pagesBar = null;
    if(this.state.registeredStudentsProfile.length > 0) {
      let totalPageCount = Math.ceil(this.state.registeredStudentsProfile.length / this.state.numberOfJobsToShowPerPage);
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
                  <h2>Some Random Thing to Add Here Later</h2>
                </div>
              </div>
              <div className="col-md-8">
                <div className="educationCard">
                  <div className="experienceHeading">
                    {noRecordFoundMessage}
                    {this.returnRegisteredStudents()}
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
  registeredStudentsProfile: state.profile.registeredStudents
});

export default connect(mapStateToProps, { getStudentProfileAppliedInEvent})(EventRegisteredStudents);
