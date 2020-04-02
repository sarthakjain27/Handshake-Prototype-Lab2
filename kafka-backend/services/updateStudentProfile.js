const student = require('../models/student.model');

function handle_request(msg, callback){
  const studentName = msg.studentName.toLowerCase();
  const collegeName = msg.collegeName.toLowerCase();
  const { dateOfBirth } = msg;
  const city = msg.city.toLowerCase();
  const state = msg.cstate.toLowerCase();
  const country = msg.country.toLowerCase();
  const { careerObjective, contactPhone } = msg;
  const contactEmail = msg.contact_email.toLowerCase();
  const {emailId} = msg;

  student.findOne({emailId:emailId},function(error,result){
    if(error){
      console.log('Error in querying the database');
      callback(null,'Error');
    } if(Object.keys(result).length === 0){
      callback(null,'User Not Present');
    } else {
      console.log(result);
      result.name = studentName;
      result.collegeName = collegeName;
      result.dateOfBirth = dateOfBirth;
      result.city = city;
      result.state = state;
      result.country = country;
      result.careerObjective = careerObjective;
      result.contactPhone = contactPhone;
      result.contactEmail = contactEmail;
      if(msg.filename){
        result.profilePictureUrl = msg.filename;
      }
      result.save(function(updateError){
        if(updateError){
          console.log('Error in studentUpdateProfile');
          callback(null,'Error');
        }
        console.log('Student Profile Updated');
        callback(null,'Updated');
      });
    }
  });
};

exports.handle_request = handle_request;