const company = require('../models/company.model');

function handle_request(msg, callback){
  const {emailId} = msg;
  company.find({}, function(error, results){
    if(error){
      console.log('Error in querying the db: '+error);
      callback(null,[]);
    } if(results.length === 0){
      console.log('No Company Available');
      callback(null,[]);
    }
    const appliedEvents = [];
    for(var result of results){
      for(var eachPosting of result.eventPostings){
        if(eachPosting.registeredStudents.includes(emailId)){
          let obj = {
            profile_picture_url:result.profilePictureUrl,
            name:result.name,
            _idCompany:result._id,
            emailId:result.emailId,
            _idEvent:eachPosting._id,
            eligibility:eachPosting.eligibility,
            eventName:eachPosting.name,
            description:eachPosting.description,
            date:eachPosting.date,
            time:eachPosting.time,
            street:eachPosting.street,
            city:eachPosting.city,
            state:eachPosting.state,
            country:eachPosting.country,
            zipcode:eachPosting.zipcode,
          }
          appliedEvents.push(obj);
        }
      }
    }
    callback(null,appliedEvents);
  });
};

exports.handle_request = handle_request;