const company = require('../models/company.model');
function handle_request(msg, callback){
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
      callback(null,result.eventPostings);
    }
  });
};

exports.handle_request = handle_request;