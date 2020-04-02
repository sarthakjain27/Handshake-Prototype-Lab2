const company = require('../models/company.model');

function handle_request(msg, callback){
  const posting = {
    name: msg.eventName.toLowerCase(),
    description: msg.description,
    time: msg.time,
    date: msg.date,
    street: msg.street,
    city: msg.city.toLowerCase(),
    state: msg.cstate.toLowerCase(),
    country: msg.country.toLowerCase(),
    zipcode: msg.zipcode,
    eligibility: msg.eligibility
  }
  const {emailId} = msg;

  company.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      callback(null,'Error');
    } 
    if(Object.keys(result).length === 0){
      callback(null,'User Not Present');
    } else {
      console.log(result);
      result.eventPostings.push(posting);
      result.save()
      .then(()=>{
        callback(null,'Success');
      }).catch((err)=>{
        console.log("Inside catch of createEvent: "+err);
        callback(null,'Error');
      });
    }
  });
};

exports.handle_request = handle_request;