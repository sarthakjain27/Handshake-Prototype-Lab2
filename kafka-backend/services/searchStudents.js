const student = require('../models/student.model');

function handle_request(msg, callback) {
  const { searchParam } = msg;
  let queryParam = {};
  if (searchParam === 'Name') {
    queryParam = { name: { $regex: msg.value, $options: 'i' } };
  } else if (searchParam === 'College Name') {
    queryParam = { collegeName: { $regex: msg.value, $options: 'i' } };
  } else if (searchParam === 'Skill') {
    queryParam = { skills: msg.value };
  } else if (searchParam !== 'ALL') {
    callback(null, 'Error');
  }

  student.find(queryParam, (error, result) => {
    if (error) {
      console.log(error);
      console.log('Error in companySearchForStudents');
      callback(null, 'Error');
    }
    console.log(result);
    callback(null, result);
  });
}

exports.handle_request = handle_request;
