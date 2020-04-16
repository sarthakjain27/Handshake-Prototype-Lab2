import axios from 'axios';
import { SEARCH_EVENT, COMPANY_POSTED_EVENTS, CREATE_EVENT } from './types';
import { serverIp, serverPort } from '../config';

export const listCreatedEvents = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.post(`${serverIp}:${serverPort}/listCompanyCreatedEvents`, data)
    .then((response) => {
      if (response.data) {
        if (response.data === 'Error' || response.data === 'User Not Present' || response.data.length === 0) {
          return {
            noRecord: true,
          };
        }
        return {
          eventList: response.data,
        };
      }
    }).then((search_result) => dispatch({
      type: COMPANY_POSTED_EVENTS,
      payload: search_result,
    }))
    .catch((err) => {
      if (err.response.status === 401) {
        window.alert('Unauthorized access');
      } else {
        window.alert('Error in axios call of listCreatedEvents');
        console.log(`Error in listCreatedEvents in eventActions.js ${err}`);
      }
    });
};

export const createEvent = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  axios.post(`${serverIp}:${serverPort}/createEvent`, data)
    .then((response) => {
      console.log('createEvent Response Data');
      console.log(response.data);
      if (response.data === 'Error') {
        return { error: 'Error in connecting to database' };
      } if (response.data === 'User Not Present') {
        return { error: 'Given Company User Not Present in database' };
      } if (response.data === 'Success') {
        return { success: 'Success' };
      }
      return { error: 'Some Other Error' };
    }).then((result) => dispatch({
      type: CREATE_EVENT,
      payload: result,
    }))
    .catch((err) => {
      if (err.response.status === 401) {
        window.alert('Unauthorized access');
      } else {
        console.log(`In catch of axios post call to createEvent  api ${err}`);
        window.alert('Error in createEvent component axios Post call');
      }
    });
};

export const searchEvent = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.post(`${serverIp}:${serverPort}/getSearchedEvent`, data)
    .then((response) => {
      if (response.data) {
        if (response.data.length === 0) {
          return {
            noRecord: true,
          };
        }
        return {
          eventList: response.data,
        };
      }
    }).then((search_result) => dispatch({
      type: SEARCH_EVENT,
      payload: search_result,
    }))
    .catch((err) => {
      if (err.response.status === 401) window.alert('Unauthorized access');
      else console.log(`Error in searchEvent in eventActions.js ${err}`);
    });
};

export const getRegisteredEvents = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.post(`${serverIp}:${serverPort}/getRegisteredEvents`, data)
    .then((response) => {
      if (response.data) {
        if (response.data.length === 0) {
          return {
            noRecord: true,
          };
        }
        return {
          eventList: response.data,
        };
      }
    }).then((search_result) => dispatch({
      type: SEARCH_EVENT,
      payload: search_result,
    }))
    .catch((err) => {
      if (err.response.status === 401) window.alert('Unauthorized access');
      else console.log(`Error in getRegisteredEvents in eventActions.js ${err}`);
    });
};

export const registerForEvent = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.post(`${serverIp}:${serverPort}/registerForEvent`, data)
    .then((response) => {
      console.log('registerForEvent response data');
      console.log(response.data);
      if (response.data === 'Error') {
        window.alert('Error in registering. Please try later!');
      } else if (response.data === 'Already applied') {
        window.alert('You have already registered for this event.');
      } else if (response.data === 'Success') {
        window.alert('Successfully Registered.');
      } else {
        window.alert('Error in registering. Please try later!');
      }
    }).catch((err) => {
      if (err.response.status === 401) {
        window.alert('Unauthorized access');
      } else {
        console.log(`Error in registerForEvent post call in EventCard of Student: ${err}`);
        window.alert('Error while connecting to server');
      }
    });
};
