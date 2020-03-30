import { SEARCH_JOB, APPLY_FOR_JOB, COMPANY_POSTED_JOBS, CREATE_JOB_POST, CREATE_EVENT, APPLIED_JOBS } from "./types";
import { serverIp, serverPort } from '../config';
import axios from "axios";

export const searchJob = (data) => dispatch => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(serverIp+':'+serverPort+'/getPostedJobs',data)
  .then(response => {
    if(response.data){
      if(response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          jobList: response.data
        };
      }
    }
  }).then(search_result => dispatch({
    type: SEARCH_JOB,
    payload: search_result
  }))
  .catch(err => {
    if(err.response.status === 401){
      window.alert('Unauthorized access');
    }else console.log('Error in searchJob in jobActions.js '+err);
  });
}

export const applyForJob = (data) => dispatch => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  const config = { headers: { 'Content-Type': 'multipart/form-data'} };
  axios.post(serverIp+':'+serverPort+'/applyForJob', data, config)
  .then(response => dispatch({
    type: APPLY_FOR_JOB,
    payload: response.data
  }))
  .catch(err => {
    if(err.response.status === 401){
      window.alert('Unauthorized access');
    } else{
      dispatch({
        type: APPLY_FOR_JOB,
        payload: 'Error in making applyForJob axios call'
      })
    }
    });
}

export const listCreatedJobs = (data) => dispatch => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(serverIp+':'+serverPort+'/listCompanyPostedJobs',data)
  .then(response => {
    if(response.data){
      if(response.data === 'Error' || response.data === 'User Not Present' || response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          jobList: response.data
        };
      }
    }
  }).then(search_result => dispatch({
    type: COMPANY_POSTED_JOBS,
    payload: search_result
  }))
  .catch(err => {
    if(err.response.status === 401){
      window.alert('Unauthorized access');
    } else console.log('Error in listCreatedJobs in jobActions.js '+err);
  });
}

export const updateStudentStatus = (data) => dispatch => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(serverIp+':'+serverPort+'/updateAppliedStudentJobStatus',data)
  .then(response => dispatch({
    type: APPLY_FOR_JOB,
    payload: response.data
  })).catch(err => {
    if(err.response.status === 401){
      window.alert('Unauthorized access');
    } else{
      dispatch({
        type: APPLY_FOR_JOB,
        payload: 'Error in making updateAppliedStudentJobStatus axios call'
      })
    }})
}

export const createJob = (data) => dispatch => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  axios.post(serverIp+':'+serverPort+'/createJobPost',data)
  .then(response => {
    console.log('NewJobPost Response Data');
    console.log(response.data);
    if (response.data === 'Error') {
      return { error: 'Error in connecting to database'};
    } else if(response.data === 'User Not Present'){
      return { error: 'Given Company User Not Present in database'};
    }else if(response.data === 'Success') {
      return {success: 'Success'};
    } else {
      return {error: 'Some Other Error'};
    }
  }).then(result => dispatch({
    type:CREATE_JOB_POST,
    payload:result
  }))
  .catch(err => {
    if(err.response.status === 401){
      window.alert('Unauthorized access');
    } else {
      console.log(`In catch of axios post call to createJobPost  api ${err}`);
      window.alert('Error in createJob component axios Post call');
    }
  })
}

export const listAppliedJobs = (data) => dispatch => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post(serverIp+':'+serverPort+'/getAppliedJobs',data)
  .then(response => {
    if(response.data){
      if(response.data === 'Error' || response.data === 'No Company Available' || response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          jobList: response.data
        };
      }
    }
  }).then(search_result => dispatch({
    type: APPLIED_JOBS,
    payload: search_result
  }))
  .catch(err => {
    if(err.response.status === 401){
      window.alert('Unauthorized access');
    } else console.log('Error in listAppliedJobs in jobActions.js '+err);
  });
}

export const updateApplyForJobStatus = (data) => dispatch => {
  dispatch({
    type: data.type,
    payload: data.value
  });
}