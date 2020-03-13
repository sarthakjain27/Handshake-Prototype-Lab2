import React from 'react';
import {Card, Button, Modal, Image, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfileAppliedInJob } from '../../../actions/profileActions';
import { updateStudentStatus, updateApplyForJobStatus, listCreatedJobs } from '../../../actions/jobActions';
import { APPLY_FOR_JOB } from '../../../actions/types';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CompanyHome.css';

class JobAppliedStudents extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      registeredStudentsProfile:[],
      registeredStudents:[],
      studentResumeUrl:'',
      studentName:'',
      show:false,
      numberOfJobsToShowPerPage:5,
      currentActivePage:1
    }
    console.log(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.showStudentResume = this.showStudentResume.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goBackToListings = this.goBackToListings.bind(this);
  }

  // Constructor -> ComponentWillMount -> Render -> ComponentDidMount
  componentDidMount(){
    console.log('Component Did Mount got called');
    if(this.props.location.state.students.length > 0){
      this.setState({
        registeredStudents:this.props.location.state.students
      },()=>{
        this.props.getStudentProfileAppliedInJob(this.state.registeredStudents);
      })
    }else this.setState({
      noRecord:true
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('In JobAppliedStudents componentWillReceiveProps');
    console.log(nextProps);
    if(nextProps.registeredStudentsProfile){
      var { registeredStudentsProfile } = nextProps;
      if(registeredStudentsProfile.noRecord){
          this.setState({
              noRecord: registeredStudentsProfile.noRecord
          });
      } else {
          this.setState({
            registeredStudentsProfile: registeredStudentsProfile.registeredStudents
          });
        }
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

  handleClose(){
    this.setState({
      show:false,
      studentResumeUrl:''
    })
  }

  capitalize(word, splitParam = ' ') {
    if(word){
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    }
    return '';
  }

  goBackToListings(e){
    e.preventDefault();
    window.location.href = '/listPostings';
  }

  showStudentResume(resumeUrl,studentname){
    this.setState({
      studentResumeUrl:resumeUrl,
      studentName:studentname,
      show:true
    });
  }

  setStatus(applicationId,passedStatus){
    this.props.updateStudentStatus({status:passedStatus,jobApplicationId:applicationId,jobId:this.props.location.state.jobId,emailId:localStorage.getItem('email_id')});
  }

  returnRegisteredStudents(){
    if(this.state.registeredStudentsProfile.length > 0){
      let eachPageJobCards = [];
      let count = 0;
      let activePage = this.state.currentActivePage;
      for(let i=(activePage-1)*this.state.numberOfJobsToShowPerPage;i<this.state.registeredStudentsProfile.length && count < this.state.numberOfJobsToShowPerPage;i++,count++){
        let eachStudent = this.state.registeredStudentsProfile[i];
        eachPageJobCards.push(
            <div>
              <Card border="primary">
                <Card.Body>
                  <Card.Title>
                    <Image src={serverIp+':'+serverPort+'/'+eachStudent.profilePictureUrl}
                              alt='Student Profile Picture'
                              roundedCircle
                              style={{height:40, width:40}}/> {' '}
                    <a href={'/StudentProfile/'+eachStudent._id}>{this.capitalize(eachStudent.name)}</a> 
                    {' '}
                    <Button variant="info" onClick={()=>this.showStudentResume(eachStudent.resumeFileUrl,eachStudent.name)}>Resume</Button>
                    {' '}
                    <Button variant="success" onClick={()=>this.setStatus(eachStudent.jobApplicationId, 'reviewed')}>Review</Button>
                    {' '}
                    <Button variant="danger" onClick={()=>this.setStatus(eachStudent.jobApplicationId, 'declined')}>Decline</Button>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {this.capitalize(eachStudent.collegeName)}
                  </Card.Subtitle>
                  <Card.Text>
                    <b>Career Objective</b> <br />
                    {eachStudent.careerObjective}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <b><i>Status: </i></b> {this.capitalize(eachStudent.status)}
                </Card.Footer>
              </Card>
              <br />
            </div>);
      }
      return eachPageJobCards;
    }
    else return [];
  }

  render(){
    if (!localStorage.getItem('userRole')) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.href = '/';
    }
    let resumeShow = <h3>Student didn't upload any Resume</h3>
    if(this.state.studentResumeUrl!==''){
      resumeShow = <iframe src={serverIp+':'+serverPort+'/'+this.state.studentResumeUrl} style={{width:770,height:800}}></iframe>
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

    if(this.props.studentStatusUpdateMessage!==''){
      this.props.updateApplyForJobStatus({type:APPLY_FOR_JOB, value:''});
      this.props.listCreatedJobs({emailId:localStorage.getItem('email_id')});
      if(this.props.studentStatusUpdateMessage === 'Updated'){
        window.alert('Updated student application status successfully');
      } else{
        window.alert('Error in updating student application status');
      }
      //window.location.reload();
      //window.location.href = '/listPostings';
    }
    return(
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div>
          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.capitalize(this.state.studentName)}'s Resume</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {resumeShow}
            </Modal.Body>
          </Modal>
        </div>
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <div className="experienceHeading">
                  <h3><Button style={{width:150,height:50}} onClick={this.goBackToListings}>Go Back</Button></h3>
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
  registeredStudentsProfile: state.profile.registeredStudents,
  studentStatusUpdateMessage: state.job.applyForJob
});

export default connect(mapStateToProps, { getStudentProfileAppliedInJob, updateStudentStatus, updateApplyForJobStatus, listCreatedJobs })(JobAppliedStudents);