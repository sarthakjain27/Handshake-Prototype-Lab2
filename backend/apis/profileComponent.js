const student = require('../models/student.model');
const company = require('../models/company.model');

const getStudentInfo = (req, res) => {
  console.log('Inside getStudentInfo');
  console.log(req.body);
  student.findOne({emailId:req.body.emailId},{password:0},function(error,result){
    if(error){
      console.log('Error in querying the database');
      res.send('Error');
    }
    if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else{
      console.log(result);
      res.send(result);
    }
  });
}

const getStudentEducation = (req, res) => {
  console.log('Inside getStudentEducation');
  console.log(req.body);
  student.findOne({emailId:req.body.emailId},{educations:1},function(error,result){
    if(error){
      console.log('Error in querying the database');
      res.send('Error');
    }
    if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else{
      console.log(result);
      res.send(result);
    }
  });
}

const getCompanyInfo = (req, res) => {
  console.log('Inside getCompanyInfo');
  console.log(req.body);
  if(req.body.emailId){
    company.findOne({emailId:req.body.emailId},{password:0},function(error,result){
      if(error){
        console.log('Error in querying the database');
        res.send('Error');
      }
      if(Object.keys(result).length === 0){
        res.send('User Not Present');
      } else{
        console.log(result);
        res.send(result);
      }
    });
  } else if(req.body.id){
    company.findById(req.body.id,{password:0},function(error,result){
      if(error){
        console.log('Error in querying the database');
        res.send('Error');
      }
      if(Object.keys(result).length === 0){
        res.send('User Not Present');
      } else{
        console.log(result);
        res.send(result);
      }
    });
  } else{
    res.send('User Not Present');
  }
}

const companyUpdateProfile = (req, res) => {
  console.log('Inside companyUpdateProfile');
  console.log(req.body);
  if (req.file) {
    console.log('Company Profile Picture Uploaded');
    console.log(req.file);
  }
  const emailId = req.body.emailId.toLowerCase();
  const name = req.body.companyName.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { description, contactPhone } = req.body;
  const contactEmail = req.body.contact_email.toLowerCase();
  let profilePictureUrl = '';
  
  company.findOne({emailId:emailId},function(error,result){
    if(error){
      console.log('Error in querying the database');
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else {
      console.log(result);
      result.name = name;
      result.city = city;
      result.state = state;
      result.country = country;
      result.description = description;
      result.contactPhone = contactPhone;
      result.contactEmail = contactEmail;
      if(req.file){
        result.profilePictureUrl = req.file.filename;
      }
      result.save(function(updateError){
        if(updateError){
          console.log('Error in companyUpdateProfile');
          res.send('Error');
        }
        console.log('Company Profile Updated');
        res.send('Updated');
      });
    }
  });
}


exports.getStudentInfo = getStudentInfo;
exports.getCompanyInfo = getCompanyInfo;
exports.getStudentEducation = getStudentEducation;
exports.companyUpdateProfile = companyUpdateProfile;