const company = require('../models/company.model');

function handle_request(msg, callback) {
  const {
    jobPostId, studentId, date, companyName,
  } = msg.body;
  const resumeLocation = msg.file.filename;
  company.findOne({ name: companyName }, (error, result) => {
    if (error) {
      console.log(error);
      callback(null, 'Error');
    } if (result === null) {
      console.log(`${companyName} Company Not Found`);
      callback(null, 'Company Not Found');
    }
    let i = 0;
    let alreadyApplied = false;
    for (const eachPosting of result.jobPostings) {
      // jobPostId is string and eachPosting._id is Object so using double equals and not ===
      if (eachPosting._id == jobPostId) {
        console.log('Posting found');
        for (const eachStudent of eachPosting.registeredStudents) {
          if (eachStudent.studentId === studentId) {
            alreadyApplied = true;
            break;
          }
        }
        break;
      }
      i++;
    }
    if (alreadyApplied) {
      callback(null, 'Already applied');
    } else {
      result.jobPostings[i].registeredStudents.push({
        studentId, status: 'pending', resumeFileUrl: resumeLocation, applyingDate: date,
      });
      result.save((error) => {
        if (error) {
          console.log(error);
          callback(null, 'Error');
        }
        callback(null, 'Successfully Applied');
      });
    }
  });
}

exports.handle_request = handle_request;
