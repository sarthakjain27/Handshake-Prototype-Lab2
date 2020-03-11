import { USER_LOGIN, USER_LOGOUT } from "./types";
import { serverIp, serverPort } from '../config';
import axios from "axios";

export const userLogin = (loginData) => dispatch => {
  axios.defaults.withCredentials = true;
  axios.post(serverIp+':'+serverPort+'/login',loginData)
  .then(response => dispatch({
    type: USER_LOGIN,
    payload: response.data
  }))
  .catch(err => dispatch({
    type: USER_LOGIN,
    payload: 'Error in making signup axios call'
  }))
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});

