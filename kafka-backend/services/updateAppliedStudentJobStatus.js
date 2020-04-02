const company = require('../models/company.model');

function handle_request(msg, callback){
  const {status, jobApplicationId, jobId, emailId} = msg;
  company.findOne({emailId: emailId},function(error,result){
    if(error){
      console.log(error);
      callback(null,'Error');
    } if(result === null){
      console.log('Company not found with emailId: '+emailId);
      callback(null,'Company Not Found');
    }
    let i=0,j=0;
    for(var eachPosting of result.jobPostings){
      if(eachPosting._id == jobId){
        console.log('Posting found');
        for(var eachStudent of eachPosting.registeredStudents){
          if(eachStudent._id == jobApplicationId){
            break;
          }
          j++;
        }
        break;
      }
      i++;
    }
    result.jobPostings[i].registeredStudents[j].status=status;
    result.save(function(error){
      if(error){
        console.log(error);
        callback(null,'Error');
      }
      callback(null,'Updated');
    });
  })
};

exports.handle_request = handle_request;