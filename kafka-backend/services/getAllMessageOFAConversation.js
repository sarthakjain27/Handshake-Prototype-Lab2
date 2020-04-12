const messageSchema = require('../models/message.model');

function handle_request(msg, callback) {
  const {
    fromEmailId, fromRole, toEmailId, toRole,
  } = msg;
  let conversationId = '';
  if (fromRole === 'company') {
    conversationId = `${fromEmailId}_${toEmailId}`;
  } else if (toRole === 'company') {
    conversationId = `${toEmailId}_${fromEmailId}`;
  } else if (fromEmailId.localeCompare(toEmailId) <= 0) {
    conversationId = `${fromEmailId}_${toEmailId}`;
  } else {
    conversationId = `${toEmailId}_${fromEmailId}`;
  }
  messageSchema.findOne({ conversationId }, (error, result) => {
    if (error) {
      console.log('Error in searching the message collection to find the conversation');
      callback(null, 'Error');
    } else if (result === null) {
      console.log(`No conversation exist with given id: ${conversationId}`);
      callback(null, []);
    } else {
      console.log(`Conversation exist with given id: ${conversationId}`);
      console.log(result);
      callback(null, result.chat);
    }
  });
}

exports.handle_request = handle_request;
