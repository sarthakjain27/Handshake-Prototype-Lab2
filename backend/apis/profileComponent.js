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

const getCompanyInfo = (req, res) => {
  console.log('Inside getCompanyInfo');
  console.log(req.body);
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
}



exports.getStudentInfo = getStudentInfo;
exports.getCompanyInfo = getCompanyInfo;