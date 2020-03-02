import React from 'react';
import {Card, Button, Modal, Image} from 'react-bootstrap';
import axios from 'axios';
import {serverIp, serverPort} from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CompanyHome.css';

class JobAppliedStudents extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      registeredStudents:this.props.location.state.students,
      registeredStudentsProfile:[],
      studentResumeUrl:'',
      studentName:'',
      show:false
    }
    console.log(props);
    this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.showStudentResume = this.showStudentResume.bind(this);
    this.setReviewStatus = this.setReviewStatus.bind(this);
    this.setDeclineStatus = this.setDeclineStatus.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // Constructor -> ComponentWillMount -> Render -> ComponentDidMount
  componentDidMount(){
    let profiles = [];
    this.state.registeredStudents.forEach((eachStudent)=>{
      axios.post(serverIp+':'+serverPort+'/getStudentInfo',{emailId:eachStudent.studentId})
      .then(response => {
        console.log('getStudentsRegisteredInAJob Response data in componentDidMount');
        console.log(response.data);
        if(response.data === 'Error'){
          window.alert('Error in Querying Database');
        } else if(response.data === 'User Not Present'){
          window.alert(eachStudent.studentId+' student not present in database');
        } else{
          response.data['status'] = eachStudent.status;
          response.data['resumeFileUrl'] = eachStudent.resumeFileUrl;
          response.data['applyingDate'] = eachStudent.applyingDate;
          response.data['jobApplicationId'] = eachStudent._id;
          profiles.push(response.data);
        }
      }).catch(err => {
        console.log(`Error in componentDidMount of JobAppliedStudents: ${err}`);
        window.alert('Error in connecting to server');
      });
    })
    this.setState({
      registeredStudentsProfile:profiles
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
  }

  showStudentResume(resumeUrl,studentname){
    this.setState({
      studentResumeUrl:resumeUrl,
      studentName:studentname,
      show:true
    });
  }

  setReviewStatus(applicationId){
    axios.post(serverIp+':'+serverPort+'/updateAppliedStudentJobStatus',{status:'reviewed',jobApplicationId:applicationId,jobId:this.props.location.state.jobId})
    .then(response => {
      console.log('setReviewStatus response');
      console.log(response.data);
      if(response.data === 'Error'){
        window.alert('Error in updating student job status');
      } else {
        window.alert('Successfully updated student job status');
        window.location.reload();
      }
    }).catch(err => {
      console.log('Error in setReviewStatus in JobAppliedStudents component: '+err);
      window.alert('Error in connecting to server');
    })
  }

  setDeclineStatus(applicationId){
    axios.post(serverIp+':'+serverPort+'/updateAppliedStudentJobStatus',{status:'declined',jobApplicationId:applicationId,jobId:this.props.location.state.jobId})
    .then(response => {
      console.log('setDeclineStatus response');
      console.log(response.data);
      if(response.data === 'Error'){
        window.alert('Error in updating student job status');
      } else {
        window.alert('Successfully updated student job status');
        window.location.reload();
      }
    }).catch(err => {
      console.log('Error in setDeclineStatus in JobAppliedStudents component: '+err);
      window.alert('Error in connecting to server');
    })
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
                  <Button variant="success" onClick={()=>this.setReviewStatus(eachStudent.jobApplicationId)}>Reviewed</Button>
                  {' '}
                  <Button variant="danger" onClick={()=>this.setDeclineStatus(eachStudent.jobApplicationId)}>Decline</Button>
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
    let resumeShow = <h3>Student didn't upload any Resume</h3>
    if(this.state.studentResumeUrl!==''){
      resumeShow = <iframe src={serverIp+':'+serverPort+'/'+this.state.studentResumeUrl} style={{width:770,height:800}}></iframe>
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
                  <h3>Some Random Thing to Add Here Later</h3>
                </div>
              </div>
              <div className="col-md-8">
                <div className="educationCard">
                  <div className="experienceHeading">
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

export default JobAppliedStudents;