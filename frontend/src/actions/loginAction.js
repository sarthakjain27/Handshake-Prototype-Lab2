import { USER_LOGIN, USER_LOGOUT } from "./types";
import { serverIp, serverPort } from '../config';
import axios from "axios";

export const userLogin = (loginData) => dispatch => {
  axios.defaults.withCredentials = true;
  axios.post(serverIp+':'+serverPort+'/login',loginData)
  .then(response => {
    //console.log(response.data);
    dispatch({
    type: USER_LOGIN,
    payload: response.data
  })})
  .catch(err => dispatch({
    type: USER_LOGIN,
    payload: err.response.data
  }))
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});

