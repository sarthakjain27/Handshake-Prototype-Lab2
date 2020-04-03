import React from 'react';
import './StudentProfile.css';
import { Tooltip, Col, FormGroup} from 'reactstrap';
import {
  Card, Button, Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfile, updateSkills } from '../../../actions/profileActions';
import {addMessageInConversation} from '../../../actions/messageActions'
import Select from 'react-select';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import Education from './Education';
import Experience from './Experience';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      education: [],
      experience: [],
      basicDetails: '',
      skills: [],
      allSkills: [{ label: 'JavaScript', value: 'javascript' },
        { label: 'Nodejs', value: 'nodejs' },
        { label: 'Reactjs', value: 'reactjs' },
        { label: 'Java', value: 'java' },
        { label: 'SQL', value: 'sql' },
        { label: 'Python', value: 'python' },
        { label: 'C++', value: 'c++' },
        { label: 'Docker', value: 'docker' },
        { label: 'GIT', value: 'git' },
        { label: 'AWS', value: 'aws' }],
      selectedSkills: [],
      tooltipOpen: false,
      messageModalShow:false,
      message:''
    };
    this.capitalize = this.capitalize.bind(this);
    this.editBasicDetails = this.editBasicDetails.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.displayEducation = this.displayEducation.bind(this);
    this.displayExperience = this.displayExperience.bind(this);
    this.addExperience = this.addExperience.bind(this);
    this.displaySkills = this.displaySkills.bind(this);
    this.skillChangeHandler = this.skillChangeHandler.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.messageModalShowChangeHandler = this.messageModalShowChangeHandler.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleApplicationClose = this.handleApplicationClose.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getStudentProfile({emailId:localStorage.getItem('email_id')});
    } else {
      console.log(this.props);
      this.props.getStudentProfile({emailId:this.props.match.params.id});
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if (nextProps.profile) {
      var { profile } = nextProps;
      this.setState({
        basicDetails:{student_name:profile.name,date_of_birth:profile.dateOfBirth,college_name:profile.collegeName,city:profile.city,state:profile.state,country:profile.country,career_objective:profile.careerObjective,contact_phone:profile.contactPhone,contact_email:profile.contactEmail,profile_picture_url:profile.profilePictureUrl},
        education:profile.educations,
        experience:profile.experiences,
        skills:profile.skills
      },()=>{
        if (!this.props.match.params.id) {
        localStorage.setItem('profile_picture_url',this.state.basicDetails.profile_picture_url);
        }
        //window.location.reload();
      });
    }
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleApplicationClose(){
    this.setState({
      messageModalShow:false
    });
  }

  messageModalShowChangeHandler(e){
    e.preventDefault();
    this.setState({
      messageModalShow:true
    });
  }

  submitMessage(e){
    e.preventDefault();
    this.props.addMessageInConversation({fromEmailId:localStorage.getItem('email_id'),
                                          fromRole:localStorage.getItem('userRole'),
                                          toEmailId:this.props.match.params.id,
                                          toRole:'student',
                                          message:this.state.message,
                                          fromProfilePictureUrl:localStorage.getItem('profile_picture_url'),
                                          fromName:localStorage.getItem('name'),
                                          toProfilePictureUrl:this.state.basicDetails.profile_picture_url,
                                          toName:this.state.basicDetails.student_name});
    this.setState({
      messageModalShow:false
    });
  }

  onToggle() {
    const previousState = this.state.tooltipOpen;
    this.setState({
      tooltipOpen: !previousState,
    });
  }

  skillChangeHandler(e) {
    console.log(e);
    if (e === null) {
      this.setState({
        selectedSkills: [],
      }, () => {
        console.log(this.state.selectedSkills);
      });
    } else {
      this.setState({
        selectedSkills: e,
      }, () => {
        console.log(this.state.selectedSkills);
      });
    }
  }

  updateSkills(e) {
    e.preventDefault();
    console.log(this.state.selectedSkills);
    const newSkillSet = [];
    this.state.selectedSkills.forEach((eachSkill) => {
      newSkillSet.push(eachSkill.value);
    });
    console.log(newSkillSet);
    // console.log(JSON.stringify(newSkillSet));
    if (newSkillSet.length === 0) {
      window.alert('Skill Set Cannot be empty. Please select atleast 1 skill to be as your skill');
      window.location.reload();
    } else {
      const data = {
        emailId: localStorage.getItem('email_id'),
        skills: newSkillSet,
      };
      console.log(data);
      this.props.updateSkills(data);
    }
  }

  displayEducation() {
    if (!this.props.match.params.id) {
      return this.state.education.map((eachEducation) => <Education education={eachEducation} key={eachEducation._id} showButtons />);
      // for each object in exercise we are returning an Exercise component and passing three props
    }
    return this.state.education.map((eachEducation) => <Education education={eachEducation} key={eachEducation._id} showButtons={false} />);
    // for each object in exercise we are returning an Exercise component and passing three props
  }

  displayExperience() {
    if (!this.props.match.params.id) {
      return this.state.experience.map((eachExperience) => <Experience experience={eachExperience} key={eachExperience._id} showButtons />);
      // for each object in exercise we are returning an Exercise component and passing three props
    }
    return this.state.experience.map((eachExperience) => <Experience experience={eachExperience} key={eachExperience._id} showButtons={false} />);
    // for each object in exercise we are returning an Exercise component and passing three props
  }

  displaySkills() {
    const capitalizedSkills = this.state.skills.map((eachSkill) => this.capitalize(eachSkill));
    return capitalizedSkills.join(', ');
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editBasicDetails(e) {
    e.preventDefault();
    window.location.href = '/editStudentProfile';
  }

  addEducation(e) {
    e.preventDefault();
    window.location.href = '/addEducationStudentProfile';
  }

  addExperience(e) {
    e.preventDefault();
    window.location.href = '/addExperienceStudentProfile';
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }

    let profile = null;
    if (!this.props.match.params.id) {
      let profileSrc = 'default.png';
      if (this.state.basicDetails.profile_picture_url && this.state.basicDetails.profile_picture_url !== '') {
        profileSrc = this.state.basicDetails.profile_picture_url;
      }
      profile = (
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <Card border="primary">
                  <Card.Img variant="top" src={`${serverIp}:${serverPort}/${profileSrc}`} alt="Profile Picture" style={{ height: 300 }} />
                  <Card.Body>
                    <Card.Title>{this.capitalize(this.state.basicDetails.student_name)}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date of Birth:
                      {' '}
                      {this.state.basicDetails.date_of_birth}
                      {' '}
                      <br />
                      {this.capitalize(this.state.basicDetails.college_name)}
                      {' '}
                      <br />
                      {this.capitalize(this.state.basicDetails.city)}
                      ,
                      {this.capitalize(this.state.basicDetails.state)}
                      ,
                      {this.capitalize(this.state.basicDetails.country)}
                    </Card.Subtitle>
                    <Card.Text>
                      {this.capitalize(this.state.basicDetails.career_objective)}
                    </Card.Text>
                    <Button variant="primary" onClick={this.editBasicDetails}>Edit</Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <b>Contact Phone:</b>
                      {' '}
                      {this.state.basicDetails.contact_phone}
                    </small>
                    {' '}
                    <br />
                    <small className="text-muted">
                      <b>Contact Email:</b>
                      {' '}
                      {this.state.basicDetails.contact_email}
                    </small>
                  </Card.Footer>
                </Card>
                <br />
                <div className="educationCardSkillSet">
                  <div className="experienceHeading" id="TooltipExample">
                    <h2>Skill Set</h2>
                    <label>Add Skill:</label>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
                      It will update your existing skill set with new skill set you select.
                    </Tooltip>
                    <Select
                      isMulti
                      required
                      onChange={this.skillChangeHandler}
                      options={this.state.allSkills}
                      value={this.state.selectedSkills}
                    />
                    <br />
                    <Button variant="primary" onClick={this.updateSkills}>Update Skill Set</Button>
                  </div>
                  <div className="experienceHeading">
                    <b>Your skills: </b>
                    {this.displaySkills()}
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="educationCardStudentProfile">
                  <div className="experienceHeading">
                    <h2>Education</h2>
                  </div>
                  <div className="experienceHeading">
                    {this.displayEducation()}
                  </div>
                  <div className="style__card-item___B1f7m">
                    <div className="style__card-button___1X6wz">
                      <button className="style__plain___13WSa" onClick={this.addEducation}>
                        <span>Add Education</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="experienceCardStudentProfile">
                  <div className="experienceHeading">
                    <h2>Professional Experience</h2>
                  </div>
                  <div className="experienceHeading">
                    {this.displayExperience()}
                  </div>
                  <div className="style__card-item___B1f7m">
                    <div className="style__card-button___1X6wz">
                      <button className="style__plain___13WSa" onClick={this.addExperience}>
                        <span>Add Experience</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      let profileSrc = 'default.png';
      if (this.state.basicDetails.profile_picture_url && this.state.basicDetails.profile_picture_url !== '') {
        profileSrc = this.state.basicDetails.profile_picture_url;
      }
      let showMessageButton = null;
      if(this.props.match.params.id!==localStorage.getItem('email_id'))
        showMessageButton = <Button variant="primary" onClick={this.messageModalShowChangeHandler}>
                              Message
                            </Button>
      else{
        if(localStorage.getItem('userRole')!=='student'){
          showMessageButton = <Button variant="primary" onClick={this.messageModalShowChangeHandler}>
                              Message
                            </Button>
        }
      }
      
      profile = (
        <div>
          <div className="main-div-studentProfile">
            <div className="main-relative-div-studentProfile">
              <div className="row">
                <div className="col-md-4">
                  <Card border="primary">
                    <Card.Img variant="top" src={`${serverIp}:${serverPort}/${profileSrc}`} alt="Profile Picture" style={{ height: 300 }} />
                    <Card.Body>
                      <Card.Title>{this.capitalize(this.state.basicDetails.student_name)}
                      {' '}
                      {showMessageButton}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Date of Birth:
                        {' '}
                        {this.capitalize(this.state.basicDetails.date_of_birth)}
                        {' '}
                        <br />
                        {this.capitalize(this.state.basicDetails.college_name)}
                        {' '}
                        <br />
                        {this.capitalize(this.state.basicDetails.city)}
                        ,
                        {this.capitalize(this.state.basicDetails.state)}
                        ,
                        {this.capitalize(this.state.basicDetails.country)}
                      </Card.Subtitle>
                      <Card.Text>
                        {this.state.basicDetails.career_objective}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        {' '}
                        <b>Contact Phone:</b>
                        {' '}
                        {this.state.basicDetails.contact_phone}
                      </small>
                      {' '}
                      <br />
                      <small className="text-muted">
                        <b>Contact Email:</b>
                        {' '}
                        {this.state.basicDetails.contact_email}
                      </small>
                    </Card.Footer>
                  </Card>
                  <br />
                  <div className="educationCardSkillSet">
                    <div className="experienceHeading">
                      <h2>Student Skill Set</h2>
                      {this.displaySkills()}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="educationCardStudentProfile">
                    <div className="experienceHeading">
                      <h2>Education</h2>
                    </div>
                    <div className="experienceHeading">
                      {this.displayEducation()}
                    </div>
                  </div>
                  <div className="experienceCardStudentProfile">
                    <div className="experienceHeading">
                      <h2>Professional Experience</h2>
                    </div>
                    <div className="experienceHeading">
                      {this.displayExperience()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal show={this.state.messageModalShow} onHide={this.handleApplicationClose} >
              <Modal.Header closeButton>
                <Modal.Title>
                  Include your message
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <FormGroup row>
                    <Col sm={8}>
                      <textarea
                        rows="4"
                        cols="55"
                        name="message" 
                        placeholder="Type your message here..."
                        onChange={this.onChangeHandler}
                        required />
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 4, offset:3 }}>
                      {/* I am using Button of react-bootstrap and not reactstrap and hence cannot give onSubmit for form and giving onClick of button */}
                      <Button style={{width:150,height:50}} onClick={this.submitMessage}>Apply</Button>
                    </Col>
                  </FormGroup>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        {profile}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.user
});

export default connect(mapStateToProps, { getStudentProfile, updateSkills, addMessageInConversation })(StudentProfile);
