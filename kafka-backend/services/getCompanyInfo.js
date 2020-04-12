const company = require('../models/company.model');

function handle_request(msg, callback) {
  if (msg.emailId) {
    company.findOne({ emailId: msg.emailId }, { password: 0 }, (error, result) => {
      if (error) {
        console.log('Error in querying the database');
        callback(null, 'Error');
      }
      if (Object.keys(result).length === 0) {
        callback(null, 'User Not Present');
      } else {
        console.log(result);
        callback(null, result);
      }
    });
  } else if (msg.id) {
    company.findById(msg.id, { password: 0 }, (error, result) => {
      if (error) {
        console.log('Error in querying the database');
        callback(null, 'Error');
      }
      if (Object.keys(result).length === 0) {
        callback(null, 'User Not Present');
      } else {
        console.log(result);
        callback(null, result);
      }
    });
  } else {
    callback(null, 'User Not Present');
  }
}

exports.handle_request = handle_request;
