import { REGISTERED_STUDENTS, STUDENT_EDUCATION, COMPANY_PROFILE, UPDATE_PROFILE } from './types';
import { serverIp, serverPort } from '../config';
import axios from "axios";

export const getStudentProfileAppliedInJob = (data) => dispatch => {
  let profiles = [];
  data.forEach((eachStudent)=>{
    axios.post(serverIp+':'+serverPort+'/getStudentInfo',{emailId:eachStudent.studentId})
    .then(response => {
      console.log('getStudentsRegisteredInAJob Response data in componentDidMount');
      console.log(response.data);
      if(response.data === 'Error'){
        window.alert('Error in Querying Database');
      } else if(response.data === 'User Not Present'){
        window.alert(eachStudent.studentId+' student not present in database');
      } else{
        const each = {...response.data,status:eachStudent.status,resumeFileUrl:eachStudent.resumeFileUrl,applyingDate:eachStudent.applyingDate,jobApplicationId:eachStudent._id};
        profiles.push(each);
      }
    }).then(()=>dispatch({
      type: REGISTERED_STUDENTS,
      payload: {registeredStudents:profiles}
    })).catch(err => {
      console.log(`Error in componentDidMount of JobAppliedStudents: ${err}`);
      window.alert('Error in connecting to server');
    });
  })
}

export const getStudentAllEducation = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/getStudentAllEducation`, data)
  .then((resp) => {
    console.log('getStudentAllEducation');
    console.log(resp.data);
    sessionStorage.setItem('educationSetFromListEvents', JSON.stringify(resp.data.educations));
  }).catch((err) => {
    console.log(`Error in getStudentAllEducation post call in profileActions.js: ${err}`);
    window.alert('Error in connecting to server');
  });
}

export const getCompanyProfile = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/getCompanyInfo`, data)
  .then((resp) => dispatch({
    type:COMPANY_PROFILE,
    payload:resp.data
  })).catch((err) => {
    console.log(`Error in getCompanyProfile post call in profileActions.js: ${err}`);
    window.alert('Error in connecting to server');
  });
}

export const updateCompanyProfile = (data) => dispatch => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  axios.post(`${serverIp}:${serverPort}/updateCompanyProfile`, data, config)
  .then((response) => {
    console.log('UpdateCompanyProfile Response Data');
    console.log(response.data);
    if(response.data !== 'Updated'){
      window.alert('Error in updating company profile');
    } else {
      window.alert('Successfully Updated company profile');
      getCompanyProfile({emailId:localStorage.getItem('email_id')});

      // below two lines to update the navbar image after setting local storage and then redirecting to companyProfile
      window.location.reload();
      window.location.href='/companyProfile';
    }
  }).catch((err) => {
    console.log(`Error in getCompanyProfile post call in profileActions.js: ${err}`);
    window.alert('Error in connecting to server');
  });
}