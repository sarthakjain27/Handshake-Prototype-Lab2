const kafka = require('../kafka/client');

const addMessageInAConversation = (req, res) => {
  console.log('Inside addMessageInAConversation');
  console.log(req.body);
  kafka.make_request('addMessageInAConversation', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
}

const getAllMessageOFAConversation = (req, res) => {
  console.log('Inside getAllMessageOFAConversation');
  console.log(req.body);
  kafka.make_request('getAllMessageOFAConversation', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
}

const getAllConversations = (req, res) => {
  console.log('Inside getAllConversations');
  console.log(req.body);
  kafka.make_request('getAllConversationsOfAUser', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
}

exports.addMessageInAConversation = addMessageInAConversation;
exports.getAllMessageOFAConversation = getAllMessageOFAConversation;
exports.getAllConversations = getAllConversations;