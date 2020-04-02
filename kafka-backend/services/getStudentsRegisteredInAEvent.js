const company = require('../models/company.model');

function handle_request(msg, callback){
  const { eventId, emailId } = msg;
  company.findOne({"eventPostings._id":eventId,"emailId":emailId},function(error,result){
    if(error){
      console.log(error);
      callback(null,'Error');
    } if(result === null){
      console.log('No event with given _id');
      callback(null,'Error');
    } else callback(null,result.eventPostings.registeredStudents);
  })
};

exports.handle_request = handle_request;