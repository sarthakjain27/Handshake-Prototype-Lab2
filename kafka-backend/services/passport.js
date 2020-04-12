const company = require('../models/company.model');
const student = require('../models/student.model');

function handle_request(msg, callback) {
  const { user_id, userRole } = msg;
  let modelToUse = '';
  if (userRole === 'company') {
    modelToUse = company;
  } else if (userRole === 'student') {
    modelToUse = student;
  } else return callback(null, false);
  modelToUse.findById(user_id, (err, results) => {
    if (err) {
      return callback(null, false);
    }
    if (results) {
      callback(null, results);
    } else {
      callback(null, false);
    }
  });
}

exports.handle_request = handle_request;
