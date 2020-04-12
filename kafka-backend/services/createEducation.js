const student = require('../models/student.model');

function handle_request(msg, callback) {
  const education = {
    name: msg.collegeName.toLowerCase(),
    city: msg.city.toLowerCase(),
    state: msg.cstate.toLowerCase(),
    country: msg.country.toLowerCase(),
    degree: msg.degree.toLowerCase(),
    major: msg.major,
    yearOfPassing: msg.yearOfPassing,
    cgpa: msg.cgpa,
  };
  const { emailId } = msg;
  student.findOne({ emailId }, (err, result) => {
    if (err) {
      console.log(err);
      callback(null, 'Error');
    } if (Object.keys(result).length === 0) {
      callback(null, 'User Not Present');
    } else {
      console.log(result);
      result.educations.push(education);
      result.save()
        .then(() => {
          callback(null, 'Success');
        }).catch((err) => {
          console.log('Inside catch of createEducation');
          callback(null, 'Error');
        });
    }
  });
}

exports.handle_request = handle_request;
