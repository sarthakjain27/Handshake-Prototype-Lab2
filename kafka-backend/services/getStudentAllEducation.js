const student = require('../models/student.model');

function handle_request(msg, callback) {
  student.findOne({ emailId: msg.emailId }, { educations: 1 }, (error, result) => {
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
}

exports.handle_request = handle_request;
