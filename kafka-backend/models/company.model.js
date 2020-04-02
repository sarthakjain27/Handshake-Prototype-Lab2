const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registeredStudentInJob = new Schema({
  studentId:String,
  status:String,
  resumeFileUrl:String,
  applyingDate:String
});

const jobPosting = new Schema({
  title:String,
  postingDate:String,
  deadlineDate:String,
  city:String,
  state:String,
  country:String,
  salary:String,
  description:String,
  category:String,
  registeredStudents:[registeredStudentInJob]
});

const eventPosting = new Schema({
  name:String,
  description:String,
  date:String,
  time:String,
  street:String,
  city:String,
  state:String,
  country:String,
  zipcode:String,
  eligibility:[String],
  registeredStudents:[String]
});

const companyInfo = new Schema({
  name:{type:String,required:true},
  city:{type:String,required:true},
  state:{type:String,required:true},
  country:{type:String,required:true},
  description:{type:String,default:""},
  contactPhone:{type:String,default:""},
  contactEmail:{type:String,default:""},
  profilePictureUrl:{type:String,default:"default.png"},
  emailId:{type:String,required:true},
  password:{type:String,required:true},
  jobPostings:[jobPosting],
  eventPostings:[eventPosting]
});

module.exports = mongoose.model('company', companyInfo);

