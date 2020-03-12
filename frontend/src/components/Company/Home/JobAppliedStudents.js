import React from 'react';
import {Card, Button, Modal, Image, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfileAppliedInJob } from '../../../actions/profileActions';
import { updateStudentStatus, updateApplyForJobStatus, listCreatedJobs } from '../../../actions/jobActions';
import { APPLY_FOR_JOB } from '../../../actions/types';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CompanyHome.css';

class JobAppliedStudents extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      registeredStudentsProfile:[],
      registeredStudents:this.props.location.state.students,
      studentResumeUrl:'',
      studentName:'',
      show:false
    }
    console.log(props);
    this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.showStudentResume = this.showStudentResume.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goBackToListings = this.goBackToListings.bind(this);
  }

  // Constructor -> ComponentWillMount -> Render -> ComponentDidMount
  componentWillMount(){
    if(this.state.registeredStudents.length > 0){
      this.props.getStudentProfileAppliedInJob(this.state.registeredStudents);
    } else this.setState({
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
    return this.state.registeredStudentsProfile.map((eachStudent) => {
      return (
        <div>
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
          </div>
        </div>
      );
    })
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
    if(this.props.studentStatusUpdateMessage!==''){
      this.props.updateApplyForJobStatus({type:APPLY_FOR_JOB, value:''});
      //this.props.listCreatedJobs({emailId:localStorage.getItem('email_id')});
      if(this.props.studentStatusUpdateMessage === 'Updated'){
        window.alert('Updated student application status successfully');
      } else{
        window.alert('Error in updating student application status');
      }
      //window.location.reload();
      window.location.href = '/listPostings';
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