const company = require('../models/company.model');

function handle_request(msg, callback) {
  const { emailId } = msg;
  company.find({}, (error, results) => {
    if (error) {
      console.log(error);
      callback(null, 'Error');
    } if (results.length === 0) {
      console.log('No Company Available');
      callback(null, 'No Company Available');
    }
    const appliedJobs = [];
    for (const result of results) {
      // console.log(result);
      for (const eachPosting of result.jobPostings) {
        for (const eachStudent of eachPosting.registeredStudents) {
          if (eachStudent.studentId === emailId) {
            const obj = {
              profile_picture_url: result.profilePictureUrl,
              job_title: eachPosting.title,
              city: eachPosting.city,
              state: eachPosting.state,
              country: eachPosting.country,
              company_name: result.name,
              status: eachStudent.status,
              applying_date: eachStudent.applyingDate,
              application_deadline: eachPosting.deadlineDate,
            };
            appliedJobs.push(obj);
            break;
          }
        }
      }
    }
    console.log(appliedJobs);
    callback(null, appliedJobs);
  });
}

exports.handle_request = handle_request;
