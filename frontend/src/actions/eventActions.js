import { SEARCH_EVENT, APPLY_FOR_EVENT, COMPANY_POSTED_EVENTS, CREATE_EVENT } from './types';
import { serverIp, serverPort } from '../config';
import axios from "axios";

export const listCreatedEvents = (data) => dispatch => {
  axios.post(serverIp+':'+serverPort+'/listCompanyCreatedEvents',data)
  .then(response => {
    if(response.data){
      if(response.data === 'Error' || response.data === 'User Not Present' || response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          eventList: response.data
        };
      }
    }
  }).then(search_result => dispatch({
    type: COMPANY_POSTED_EVENTS,
    payload: search_result
  }))
  .catch(err => {
    window.alert('Error in axios call of listCreatedEvents');
    console.log('Error in listCreatedEvents in eventActions.js '+err);
  });
}

export const createEvent = (data) => dispatch => {
  axios.defaults.withCredentials = true;
  axios.post(serverIp+':'+serverPort+'/createEvent',data)
  .then(response => {
    console.log('createEvent Response Data');
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
    type:CREATE_EVENT,
    payload:result
  }))
  .catch(err => {
    console.log(`In catch of axios post call to createEvent  api ${err}`);
    window.alert('Error in createEvent component axios Post call');
  })
}