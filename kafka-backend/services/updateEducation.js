const student = require('../models/student.model');

function handle_request(msg, callback){
  const education = {
    name : msg.collegeName.toLowerCase(),
    city: msg.city.toLowerCase(),
    state: msg.cstate.toLowerCase(),
    country: msg.country.toLowerCase(),
    degree: msg.degree.toLowerCase(),
    major: msg.major,
    yearOfPassing: msg.yearOfPassing,
    cgpa: msg.cgpa
  }
  const {emailId, educationId} = msg;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      callback(null,'Error');
    } if(Object.keys(result).length === 0){
      callback(null,'User Not Present');
    } else {
      console.log(result);
      var idx=-1;
      for(let i=0;i<result.educations.length;i++)
      {
        if(result.educations[i]._id == educationId){
          idx = i;
          break;
        }
      }
      if(idx!==-1)
      {
        result.educations[idx] = education;
        result.save()
        .then(()=>{
          callback(null,'Success');
        }).catch((err)=>{
          console.log("Inside catch of updateEducation")
          callback(null,'Error');
        });
      }
      else callback(null,'Error');
    }
  });
};

exports.handle_request = handle_request;