const student = require('../models/student.model');

function handle_request(msg, callback){
  const {emailId} = msg;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      callback(null,'Error');
    } if(Object.keys(result).length === 0){
      callback(null,'User Not Present');
    } else {
      result.skills = msg.skills;
      result.save()
      .then(()=>{
        callback(null,'Success');
      }).catch((err)=>{
        console.log("Inside catch of updateEducation")
        callback(null,'Error');
      });
    }
  });
};

exports.handle_request = handle_request;