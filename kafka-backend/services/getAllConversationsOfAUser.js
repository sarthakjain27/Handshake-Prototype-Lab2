const messageSchema = require('../models/message.model');

function handle_request(msg, callback){
  const {userEmailId, userRole} = msg;
  messageSchema.find({
    $or:[{participant1emailId:userEmailId,participant1Role:userRole},{participant2emailId:userEmailId,participant2Role:userRole}]
  },(error,result)=>{
    if(error){
      console.log('Error in getting all conversations involving this user');
      callback(null,'Error');
    } else if(result.length === 0){
      console.log('User has no conversations yet');
      callback(null,[]);
    } else {
      console.log('Conversations exist for given user: '+userEmailId);
      console.log(result);
      callback(null,result);
    }
  });
};

exports.handle_request = handle_request;