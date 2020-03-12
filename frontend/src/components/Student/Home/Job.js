import React from 'react';
import {Card, Modal, Button} from 'react-bootstrap';
import {Col, FormGroup, Label, FormText} from 'reactstrap';
import { APPLY_FOR_JOB } from '../../../actions/types';
import { connect } from 'react-redux';
import { applyForJob, updateApplyForJobStatus } from '../../../actions/jobActions';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Job extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      applicationShow:false,
      selectedFile:null
    }
    this.capitalize = this.capitalize.bind(this);
    this.applyForJob = this.applyForJob.bind(this);
    this.handleApplicationClose = this.handleApplicationClose.bind(this);
    this.resumeFileUploadHandler = this.resumeFileUploadHandler.bind(this);
    this.submitResume = this.submitResume.bind(this);
  }

  resumeFileUploadHandler = e => {
    this.setState({
      selectedFile:e.target.files[0]
    },() => {
      console.log(this.state.selectedFile);
    })
  }

  handleApplicationClose(){
    this.setState({
      applicationShow:false
    })
  }

  capitalize(word,splitParam=' '){
    if(word){
      word = word.split(splitParam).map((eachWord) => {
        return eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' ');
      });
      word = word.join(splitParam);
      return word;
    } else return '';
  }

  applyForJob(e){
    e.preventDefault();
    this.setState({
      applicationShow:true
    })
  }

  submitResume(e){
    e.preventDefault();
    if(this.state.selectedFile === null){
      window.alert('Please upload your resume');
    } else {
      let fd = new FormData();
      fd.append('jobPostId',this.props.job._id);
      fd.append('studentId',localStorage.getItem('email_id'));
      fd.append('companyName',this.props.job.name.toLowerCase());
      let dt = new Date();
      fd.append('date',(dt.getMonth()+1)+'/'+dt.getDate()+'/'+dt.getFullYear());
      fd.append('file',this.state.selectedFile);
      this.props.applyForJob(fd);
    }
  }

  render(){
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    if(this.state.applicationShow){
      if(this.props.applyForJobStatus === 'Error'){
        window.alert('Error while applying for the job');
      } else if(this.props.applyForJobStatus === 'Already applied'){
        window.alert('Applied again to the job with new Resume');
      } else if(this.props.applyForJobStatus === 'Successfully Applied'){
        window.alert('Successfully applied for the job');
      } else if(this.props.applyForJobStatus === 'Error in making applyForJob axios call'){
        window.alert('Error in connecting to server')
      } else if(this.props.applyForJobStatus === 'Company Not Found'){
        window.alert('Given company not found in database');
      }
      if(this.props.applyForJobStatus!==''){
        this.setState({
          applicationShow:false
        },()=>{
          this.props.updateApplyForJobStatus({type:APPLY_FOR_JOB, value:''});
        })
      }
    }
    return(
      <div>
        <div>
          <br />
          <Card border="primary">
            <Card.Body>
              <Card.Title>
                {this.capitalize(this.props.job.title)} | <a href={'/viewCompanyProfile/'+this.props.job._idCompany}>{this.capitalize(this.props.job.name)}</a>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {this.capitalize(this.props.job.category)}, ${this.props.job.salary} per year <br />
                <b>Posting Date: </b>{this.props.job.postingDate} <br />
                {this.capitalize(this.props.job.city)}, {this.capitalize(this.props.job.state)}, {this.capitalize(this.props.job.country)}
              </Card.Subtitle>
              <Card.Text>
                <b>Application Deadline: </b> {this.props.job.deadlineDate} <br />
                <b>Job Description: </b>{this.props.job.description}
              </Card.Text>
              <Col sm={{ size: 4, offset:5 }}>
                <Button variant="primary" onClick={this.applyForJob}>Apply</Button>
              </Col>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Modal show={this.state.applicationShow} onHide={this.handleApplicationClose} >
            <Modal.Header closeButton>
              <Modal.Title>
                Fill Application Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup row>
                  <Label for="resume" sm={2}>Resume File</Label>
                  <Col sm={10}>
                    <input type="file" name="resume" id="resume" accept="application/pdf" onChange={this.resumeFileUploadHandler} required/>
                    <FormText color="muted">
                      Please upload pdf only.
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 4, offset:3 }}>
                    {/* I am using Button of react-bootstrap and not reactstrap and hence cannot give onSubmit for form and giving onClick of button */}
                    <Button style={{width:150,height:50}} onClick={this.submitResume}>Apply</Button>
                  </Col>
                </FormGroup>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  applyForJobStatus: state.job.applyForJob
});

export default connect(mapStateToProps, { applyForJob, updateApplyForJobStatus })(Job);