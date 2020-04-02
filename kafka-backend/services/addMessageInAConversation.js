const messageSchema = require('../models/message.model');

function handle_request(msg, callback){
  const {fromEmailId, fromRole, toEmailId, toRole, message} = msg;
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
  messageSchema.findOne({conversationId:conversationId},(error,result)=>{
    if(error){
      console.log('Error in finding the conversation with id: '+conversationId);
      callback(null,'Error');
    } else if(result === null){
      console.log('No conversation exists with the conversation with id: '+conversationId);
      let conversationToCreate = messageSchema({
        conversationId:conversationId,
        participant1emailId:fromEmailId,
        participant1Role:fromRole,
        participant1ProfilePictureUrl:msg.fromProfilePictureUrl,
        participant1Name:msg.fromName,
        participant2emailId:toEmailId,
        participant2Role:toRole,
        participant2ProfilePictureUrl:msg.toProfilePictureUrl,
        participant2Name:msg.toName,
        chat:[{fromEmailId:fromEmailId,fromRole:fromRole,toEmailId:toEmailId,toRole:toRole,message:message}]
      });
      conversationToCreate.save(function(error){
        if(error){
          console.log('Saving Error in addMessageInAConversation: '+error);
          callback(null,'Error');
        }
        console.log('Conversation Successfully Created');
        callback(null,'Success');
      });
    } else {
      console.log('Conversation exist with the conversation with id: '+conversationId);
      console.log(result);
      result.chat.push({fromEmailId:fromEmailId,fromRole:fromRole,toEmailId:toEmailId,toRole:toRole,message:message});
      result.save(function(error){
        if(error){
          console.log('Saving Error in addMessageInAConversation while pushing new chat: '+error);
          callback(null,'Error');
        }
        console.log('Message successfully pushed into existing conversation');
        //callback(null,'Success');
        // below is done to show updated chats on clicking send
        callback(null,result.chat);
      });
    }
  });
};

exports.handle_request = handle_request;