const company = require('../models/company.model');

function handle_request(msg, callback){
  const { eventId, studentId } = msg;
  company.findOne({"eventPostings._id":eventId},function(error,result){
    if(error){
      console.log(error);
      callback(null,'Error');
    } if(result === null){
      console.log('No event with given _id');
      callback(null,'Error');
    }
    let i=0;
    let alreadyApplied = false;
    for(var eachPosting of result.eventPostings){
      // eventId is string and eachPosting._id is Object so using double equals and not ===
      if(eachPosting._id == eventId){
        console.log('Posting found');
        if(eachPosting.registeredStudents.includes(studentId)){
          alreadyApplied = true;
        }
        break;
      }
      i++;
    }
    if(alreadyApplied){
      callback(null,'Already applied');
    } else {
      result.eventPostings[i].registeredStudents.push(studentId);
      result.save(function(error){
        if(error){
          console.log(error);
          callback(null,'Error');
        }
        callback(null,'Success');
      });
    }
  });
};

exports.handle_request = handle_request;