const student = require('../models/student.model');

function handle_request(msg, callback){
  const {emailId, experienceId} = msg;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      callback(null,'Error');
    } if(Object.keys(result).length === 0){
      callback(null,'User Not Present');
    } else {
      console.log(result);
      var idx=-1;
      for(let i=0;i<result.experiences.length;i++)
      {
        if(result.experiences[i]._id == experienceId){
          idx = i;
          break;
        }
      }
      if(idx !== -1){
        result.experiences.splice(idx,1);
        result.save()
        .then(()=>{
          callback(null,'Success');
        }).catch((err)=>{
          console.log("Inside catch of deleteExperience")
          callback(null,'Error');
        });
      } else callback(null,'Error');
    }
  });
};

exports.handle_request = handle_request;