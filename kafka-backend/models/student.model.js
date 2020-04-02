const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const education = new Schema({
  name:String,
  city:String,
  state:String,
  country:String,
  degree:String,
  major:String,
  yearOfPassing:String,
  cgpa:String
});

const experience = new Schema({
  name:String,
  title:String,
  city:String,
  state:String,
  country:String,
  startDate:String,
  endDate:String,
  workDescription:String
});

const studentInfo = new Schema({
  name:{type:String,required:true},
  collegeName:{type:String,required:true},
  dateOfBirth:{type:String,default:""},
  city:{type:String,default:""},
  state:{type:String,default:""},
  country:{type:String,default:""},
  careerObjective:{type:String,default:""},
  contactPhone:{type:String,default:""},
  contactEmail:{type:String,default:""},
  profilePictureUrl:{type:String,default:"default.png"},
  emailId:{type:String,required:true},
  password:{type:String,required:true},
  educations:[education],
  experiences:[experience],
  skills:[String]
});

module.exports = mongoose.model('student', studentInfo);