const message = require('../models/message.model');

const addMessageInAConversation = (req, res) => {
  console.log('Inside addMessageInAConversation');
  console.log(req.body);
  const {fromEmailId, fromRole, toEmailId, toRole, message} = req.body;
  let conversationId = '';
  if(fromRole === 'company'){
    conversationId = fromEmailId+'_'+toEmailId;
  } else if(toRole === 'company'){
    conversationId = toEmailId+'_'+fromEmailId;
  } else {
    if(fromEmailId.localeCompare(toEmailId)<=0){
      conversationId = fromEmailId+'_'+toEmailId;
    } else {
      conversationId = toEmailId+'_'+fromEmailId;
    }
  }
  message.findOne({conversationId:conversationId},(error,result)=>{
    if(error){
      console.log('Error in finding the conversation with id: '+conversationId);
      res.send('Error');
    } else if(result === null){
      console.log('No conversation exists with the conversation with id: '+conversationId);
      let conversationToCreate = message({
        conversationId:conversationId,
        participant1emailId:fromEmailId,
        participant1Role:fromRole,
        participant2emailId:toEmailId,
        participant2Role:toRole,
        chat:[{fromEmailId:fromEmailId,fromRole:fromRole,toEmailId:toEmailId,toRole:toRole,message:message}]
      });
      conversationToCreate.save(function(error){
        if(error){
          console.log('Saving Error in addMessageInAConversation: '+error);
          res.send('Error');
        }
        console.log('Conversation Successfully Created');
        res.send('Success');
      });
    } else {
      console.log('Conversation exist with the conversation with id: '+conversationId);
      console.log(result);
      result.chat.push({fromEmailId:fromEmailId,fromRole:fromRole,toEmailId:toEmailId,toRole:toRole,message:message});
      result.save(function(error){
        if(error){
          console.log('Saving Error in addMessageInAConversation while pushing new chat: '+error);
          res.send('Error');
        }
        console.log('Message successfully pushed into existing conversation');
        res.send('Success');
      });
    }
  });
}

const getAllMessageOFAConversation = (req, res) => {
  console.log('Inside getAllMessageOFAConversation');
  console.log(req.body);
  const {fromEmailId, fromRole, toEmailId, toRole, message} = req.body;
  let conversationId = '';
  if(fromRole === 'company'){
    conversationId = fromEmailId+'_'+toEmailId;
  } else if(toRole === 'company'){
    conversationId = toEmailId+'_'+fromEmailId;
  } else {
    if(fromEmailId.localeCompare(toEmailId)<=0){
      conversationId = fromEmailId+'_'+toEmailId;
    } else {
      conversationId = toEmailId+'_'+fromEmailId;
    }
  }
  message.findOne({conversationId:conversationId},(error,result)=>{
    if(error){
      console.log('Error in searching the message collection to find the conversation');
      res.send('Error');
    } else if(result === null){
      console.log('No conversation exist with given id: '+conversationId);
      res.send([]);
    } else {
      console.log('Conversation exist with given id: '+conversationId);
      console.log(result);
      res.send(result);
    }
  });
}

const getAllConversations = (req, res) => {
  console.log('Inside getAllConversations');
  console.log(req.body);
  const {userEmailId, userRole} = req.body;
  message.find({
    $or:[{participant1emailId:userEmailId,participant1Role:userRole},{participant2emailId:userEmailId,participant2Role:userRole}]
  },(error,result)=>{
    if(error){
      console.log('Error in getting all conversations involving this user');
      res.send('Error');
    } else if(result.length === 0){
      console.log('User has no conversations yet');
      res.send([]);
    } else {
      console.log('Conversations exist for given user: '+userEmailId);
      console.log(result);
      res.send(result);
    }
  });
}

exports.addMessageInAConversation = addMessageInAConversation;
exports.getAllMessageOFAConversation = getAllMessageOFAConversation;
exports.getAllConversations = getAllConversations;