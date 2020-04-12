const student = require('../models/student.model');

function handle_request(msg, callback) {
  const experience = {
    name: msg.companyName.toLowerCase(),
    title: msg.title.toLowerCase(),
    city: msg.city.toLowerCase(),
    state: msg.cstate.toLowerCase(),
    country: msg.country.toLowerCase(),
    startDate: msg.startDate,
    endDate: msg.endDate,
    workDescription: msg.description,
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
      result.experiences.push(experience);
      result.save()
        .then(() => {
          callback(null, 'Success');
        }).catch((err) => {
          console.log('Inside catch of createExperience');
          callback(null, 'Error');
        });
    }
  });
}

exports.handle_request = handle_request;
