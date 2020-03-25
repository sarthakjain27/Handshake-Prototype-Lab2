import { serverIp, serverPort } from '../config';
import axios from "axios";
import { SEARCH_STUDENTS } from "./types";

export const searchStudents = (data) => dispatch => {
  axios.post(serverIp+':'+serverPort+'/searchStudents',data)
  .then(response => {
    if(response.data){
      if(response.data==='Error' || response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          studentList: response.data
        };
      }
    }
  }).then(search_result => dispatch({
    type: SEARCH_STUDENTS,
    payload: search_result
  }))
  .catch(err => {
    console.log('Error in searchJob in jobActions.js '+err);
  });
}