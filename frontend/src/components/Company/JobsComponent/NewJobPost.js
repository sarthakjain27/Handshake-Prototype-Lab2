import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import './NewJobPost.css';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import {Col,FormGroup, Label} from 'reactstrap';
import { createJob, updateApplyForJobStatus } from '../../../actions/jobActions';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../../../node_modules/react-dropdown/style.css';
import { CREATE_JOB_POST } from '../../../actions/types';

class NewJobPost extends React.Component {

  constructor(props){
    super(props);
    this.state={
      title:'',
      postingDate:new Date(),
      deadline:new Date(),
      city:'',
      cstate:'',
      country:'',
      salary:'',
      description:'',
      category:'',
      categoryOptions:['full time','part time','intern','on campus']
    }
    
    this.onChangePostingDateHandler = this.onChangePostingDateHandler.bind(this);
    this.onChangeDeadlineHandler = this.onChangeDeadlineHandler.bind(this);
    this.onChangeCategoryHandler = this.onChangeCategoryHandler.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onChangePostingDateHandler(date) {
    this.setState({
      postingDate:date
    });
  }

  onChangeDeadlineHandler(date) {
    this.setState({
      deadline:date
    });
  }

  onChangeCategoryHandler(e){
    this.setState({
      category:e.value
    });
  }

  onPostSubmit(e){
    e.preventDefault();
    if(this.state.title === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.salary === '' || this.state.description === '' || this.state.category === '')
    {
      window.alert('Please enter all fields');
    } else {
      const data = {
        title: this.state.title,
        postingDate: (this.state.postingDate.getMonth()+1)+'/'+this.state.postingDate.getDate()+'/'+this.state.postingDate.getFullYear(),
        deadlineDate: (this.state.deadline.getMonth()+1)+'/'+this.state.deadline.getDate()+'/'+this.state.deadline.getFullYear(),
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        salary: this.state.salary,
        description: this.state.description,
        category: this.state.category,
        emailId: localStorage.getItem('email_id')
      }
      console.log(data)
      this.props.createJob(data);
    }
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
    if(this.props.status.error || this.props.status.success){
      if(this.props.status.error){
        this.props.updateApplyForJobStatus({type:CREATE_JOB_POST, value:{}})
        window.alert('Error in creating the given Job Posting');
      } else if(this.props.status.success){
        window.alert('Successfully created the given Job Posting');
        window.location.href = '/listPostings';
      }
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div className="container">
            <div>
                <div className="main-div-createJobPost-NewJobPost">
                    <div className="login-form">
                        <h2>Job Details</h2>
                    </div>
                    <form onSubmit={this.onPostSubmit}>
                      <FormGroup row>
                        <Col sm={12}>
                          <div className="form-group">
                            <input type="text" 
                                    className="form-control" 
                                    name="title" 
                                    placeholder="Job Title"
                                    pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
                                    title="Book Title can only contain letters, digits and single space character. It must start with alphanumeric characters only."
                                    onChange={this.onChangeHandler}
                                    required 
                                    autoFocus/>
                          </div>
                        </Col>
                      </FormGroup>
                        <FormGroup row>
                          <Label sm={2}>Posting Date: </Label>
                          <Col sm={4}>
                            <div className="form-group">
                              <DatePicker 
                                  className="form-control"
                                  selected={this.state.postingDate}
                                  onChange={this.onChangePostingDateHandler}
                                  required/>
                            </div>
                          </Col>
                          <Label sm={2}>Deadline Date: </Label>
                          <Col sm={4}>
                            <div className="form-group">
                              <DatePicker 
                                  className="form-control"
                                  selected={this.state.deadline}
                                  onChange={this.onChangeDeadlineHandler}
                                  required/>
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col sm={4}>
                            <div className="form-group">
                              <input type="text" 
                                    className="form-control" 
                                    name="city" 
                                    placeholder="Job City"
                                    pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                    title="It can only contain letters, single space character and period. It must start with letter only."
                                    onChange={this.onChangeHandler}
                                    required />
                            </div>
                          </Col>
                          <Col sm={4}>
                          <div className="form-group">
                            <input type="text" 
                                  className="form-control" 
                                  name="cstate" 
                                  placeholder="Job State"
                                  pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                  title="It can only contain letters, single space character and period. It must start with letter only."
                                  onChange={this.onChangeHandler}
                                  required />
                          </div>
                          </Col>
                          <Col sm={4}>
                            <div className="form-group">
                              <input type="text" 
                                    className="form-control" 
                                    name="country" 
                                    placeholder="Job Country"
                                    pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                    title="It can only contain letters, single space character and period. It must start with letter only."
                                    onChange={this.onChangeHandler}
                                    required />
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col sm={5}>
                          <div className="form-group">
                            <input type="number" 
                                  className="form-control" 
                                  name="salary" 
                                  placeholder="Annual Salary in USD"
                                  title="Please enter only digits."
                                  onChange={this.onChangeHandler}
                                  required />
                          </div>
                          </Col>
                          <Col sm={1}></Col>
                          <Col sm={6}>
                            <div className="form-group">
                              <Dropdown
                                options={this.state.categoryOptions}
                                onChange={this.onChangeCategoryHandler}
                                value={this.state.category}
                                placeholder='Job Category'
                                required
                              />
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm={2}>Job description: </Label>
                          <Col sm={8}>
                            <textarea
                                  rows="8"
                                  cols="80"
                                  name="description" 
                                  placeholder="Job Description"
                                  onChange={this.onChangeHandler}
                                  required />
                          </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                          <Col sm={{ offset:5 }}>
                            <button type="submit" className="btn btn-primary">Post Job Opening</button>
                          </Col>
                        </FormGroup>
                    </form>         
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.job.createJobPost
});

export default connect(mapStateToProps, { createJob, updateApplyForJobStatus })(NewJobPost);
