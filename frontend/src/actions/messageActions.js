import { ALL_CONVERSATIONS, ALL_CHATS } from "./types";
import { serverIp, serverPort } from '../config';
import axios from "axios";

export const userAllConversations = (data) => dispatch => {
  axios.post(serverIp+':'+serverPort+'/getAllConversationsOfAUser',data)
  .then(response => {
    if(response.data){
      if(response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          allConversations: response.data
        };
      }
    }
  }).then(search_result => dispatch({
    type: ALL_CONVERSATIONS,
    payload: search_result
  }))
  .catch(err => {
    console.log('Error in userAllConversations in messageActions.js: '+err);
  });
}

export const addMessageInConversation = (data) => dispatch => {
  axios.post(serverIp+':'+serverPort+'/addMessageInAConversation',data)
  .then(response => {
    if(response.data === 'Error'){
      window.alert('Error in sending the message');
    } else if(response.data === 'Success'){
      window.alert('Successfully messaged');
      //getAllMessagesOfAConversation(data);
    }
  }).catch(err => {
    console.log('Error in addMessageInConversation in messageActions.js: '+err);
  });
}

export const getAllMessagesOfAConversation = (data) => dispatch => {
  axios.post(serverIp+':'+serverPort+'/getAllMessageOFAConversation',data)
  .then(response => {
    if(response.data === 'Error'){
      window.alert('Error in fetching chats of this conversation');
    } else if(response.data.length === 0){
        return {
          noRecord: true
        };
      } else {
        return {
          allChats: response.data
        };
      }
  }).then(search_result => dispatch({
    type: ALL_CHATS,
    payload: search_result
  }))
  .catch(err => {
    console.log('Error in getAllMessagesOfAConversation in messageActions.js: '+err);
  });
}