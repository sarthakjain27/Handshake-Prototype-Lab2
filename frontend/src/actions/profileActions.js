import { REGISTERED_STUDENTS, STUDENT_EDUCATION, COMPANY_PROFILE, UPDATE_PROFILE, STUDENT_PROFILE } from './types';
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
    console.log(`Error in updateCompanyProfile post call in profileActions.js: ${err}`);
    window.alert('Error in connecting to server');
  });
}

export const getStudentProfile = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/getStudentInfo`, data)
  .then((resp) => dispatch({
    type:STUDENT_PROFILE,
    payload:resp.data
  })).catch((err) => {
    console.log(`Error in getStudentProfile post call in profileActions.js: ${err}`);
    window.alert('Error in connecting to server');
  });
}

export const updateStudentProfile = (data) => dispatch => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  axios.post(`${serverIp}:${serverPort}/updateStudentProfile`, data, config)
  .then((response) => {
    console.log('UpdateStudentProfile Response Data');
    console.log(response.data);
    if(response.data !== 'Updated'){
      window.alert('Error in updating student profile');
    } else {
      window.alert('Successfully Updated student profile');
      getStudentProfile({emailId:localStorage.getItem('email_id')});

      // below two lines to update the navbar image after setting local storage and then redirecting to companyProfile
      window.location.reload();
      window.location.href='/studentProfile';
    }
  }).catch((err) => {
    console.log(`Error in updateStudentProfile post call in profileActions.js: ${err}`);
    window.alert('Error in connecting to server');
  });
}

export const createEducation = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/createEducation`, data)
  .then((resp) => {
    console.log(resp.data);
    if(resp.data === 'Success'){
      window.alert('Education created successfully');
      window.location.href='/studentProfile';
    }else if(resp.data === 'Error'){
      window.alert('Error in querying the database');
    } else if(resp.data === 'User Not Present'){
      window.alert('User not present in the database');
    } else {
      window.alert('Error in querying the database');
    }
  }).catch((err) => {
    console.log(`Error in createEducation post call in profileActions.js: ${err}`);
    window.alert('Error');
  });
}

export const createExperience = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/createProfessionalExperience`, data)
  .then((resp) => {
    console.log(resp.data);
    if(resp.data === 'Error'){
      window.alert('Error in querying the database');
    } else if(resp.data === 'User Not Present'){
      window.alert('User not present in the database');
    } else if(resp.data === 'Success'){
      window.alert('Experience created successfully');
      window.location.href='/studentProfile';
    } else {
      window.alert('Error in querying the database');
    }
  }).catch((err) => {
    console.log(`Error in createExperience post call in profileActions.js: ${err}`);
    window.alert('Error');
  });
}

export const updateEducation = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/updateEducation`, data)
  .then((resp) => {
    console.log(resp.data);
    if(resp.data === 'Success'){
      window.alert('Education updated successfully');
      sessionStorage.clear();
      window.location.href='/studentProfile';
    }else if(resp.data === 'Error'){
      window.alert('Error in querying the database');
    } else if(resp.data === 'User Not Present'){
      window.alert('User not present in the database');
    } else {
      window.alert('Error in querying the database');
    }
  }).catch((err) => {
    console.log(`Error in updateEducation post call in profileActions.js: ${err}`);
    window.alert('Error');
  });
}

export const updateExperience = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/updateProfessionalExperience`, data)
  .then((resp) => {
    console.log(resp.data);
    if(resp.data === 'Success'){
      window.alert('Experience updated successfully');
      sessionStorage.clear();
      window.location.href='/studentProfile';
    }else if(resp.data === 'Error'){
      window.alert('Error in querying the database');
    } else if(resp.data === 'User Not Present'){
      window.alert('User not present in the database');
    } else {
      window.alert('Error in querying the database');
    }
  }).catch((err) => {
    console.log(`Error in updateExperience post call in profileActions.js: ${err}`);
    window.alert('Error');
  });
}

export const deleteEducation = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/deleteEducation`, data)
  .then((resp) => {
    console.log(resp.data);
    if(resp.data === 'Success'){
      window.alert('Education deleted successfully');
      window.location.reload();
    }else if(resp.data === 'Error'){
      window.alert('Error in querying the database');
    } else if(resp.data === 'User Not Present'){
      window.alert('User not present in the database');
    } else {
      window.alert('Error in querying the database');
    }
  }).catch((err) => {
    console.log(`Error in deleteEducation post call in profileActions.js: ${err}`);
    window.alert('Error');
  });
}

export const deleteExperience = (data) => dispatch => {
  axios.post(`${serverIp}:${serverPort}/deleteProfessionalExperience`, data)
  .then((resp) => {
    console.log(resp.data);
    if(resp.data === 'Success'){
      window.alert('Experience deleted successfully');
      window.location.reload();
    }else if(resp.data === 'Error'){
      window.alert('Error in querying the database');
    } else if(resp.data === 'User Not Present'){
      window.alert('User not present in the database');
    } else {
      window.alert('Error in querying the database');
    }
  }).catch((err) => {
    console.log(`Error in deleteExperience post call in profileActions.js: ${err}`);
    window.alert('Error');
  });
}

export const updateSkills = (data) => dispatch => {
  axios.defaults.withCredentials = true;
  axios.post(`${serverIp}:${serverPort}/updateSkills`, data)
  .then((response) => {
    console.log('UpdateSkills Response Data');
    console.log(response.data);
    if (response.data === 'Success') {
      window.alert('Skill Set Updated Successfully to new selected skill set');
      window.location.reload();
    } else {
      window.alert('Error in Connecting to Database');
      window.location.reload();
    }
  }).catch((err) => {
    console.log(`In catch of axios post call to updateSkills api ${err}`);
    window.alert('Error in updateSkills component axios Post call');
  });
}
