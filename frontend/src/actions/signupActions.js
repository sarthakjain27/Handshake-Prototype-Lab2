import axios from 'axios';
import { SIGNUP } from './types';
import { serverIp, serverPort } from '../config';

export const Signup = (signupData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${serverIp}:${serverPort}/signup`, signupData)
    .then((response) => dispatch({
      type: SIGNUP,
      payload: response.data,
    }))
    .catch((err) => dispatch({
      type: SIGNUP,
      payload: 'Error in making signup axios call',
    }));
};
