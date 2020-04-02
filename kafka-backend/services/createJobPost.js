const company = require('../models/company.model');

function handle_request(msg, callback){
  const posting = {
    title:msg.title.toLowerCase(),
    postingDate:msg.postingDate,
    deadlineDate:msg.deadlineDate,
    city:msg.city.toLowerCase(),
    state:msg.cstate.toLowerCase(),
    country:msg.country.toLowerCase(),
    salary:msg.salary,
    description:msg.description,
    category:msg.category
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
      result.jobPostings.push(posting);
      result.save()
      .then(()=>{
        callback(null,'Success');
      }).catch((err)=>{
        console.log("Inside catch of createJobPost")
        callback(null,'Error');
      });
    }
  });
};

exports.handle_request = handle_request;