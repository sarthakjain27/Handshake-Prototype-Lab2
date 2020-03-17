import { REGISTERED_STUDENTS, STUDENT_EDUCATION } from './types';
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