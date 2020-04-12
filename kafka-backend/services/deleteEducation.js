const student = require('../models/student.model');

function handle_request(msg, callback) {
  const { emailId, educationId } = msg;
  student.findOne({ emailId }, (err, result) => {
    if (err) {
      console.log(err);
      callback(null, 'Error');
    } if (Object.keys(result).length === 0) {
      callback(null, 'User Not Present');
    } else {
      console.log(result);
      let idx = -1;
      for (let i = 0; i < result.educations.length; i++) {
        if (result.educations[i]._id == educationId) {
          idx = i;
          break;
        }
      }
      if (idx !== -1) {
        result.educations.splice(idx, 1);
        result.save()
          .then(() => {
            callback(null, 'Success');
          }).catch((err) => {
            console.log('Inside catch of deleteEducation');
            callback(null, 'Error');
          });
      } else callback(null, 'Error');
    }
  });
}

exports.handle_request = handle_request;
