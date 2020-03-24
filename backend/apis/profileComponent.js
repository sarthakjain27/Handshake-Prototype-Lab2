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
};

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
};

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
};

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
};

const studentUpdateProfile = (req, res) => {
  console.log('Inside studentUpdateProfile');
  console.log(req.body);
  if (req.file) {
    console.log('Student Profile Picture Uploaded');
    console.log(req.file);
  }
  const studentName = req.body.studentName.toLowerCase();
  const collegeName = req.body.collegeName.toLowerCase();
  const { dateOfBirth } = req.body;
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { careerObjective, contactPhone } = req.body;
  const contactEmail = req.body.contact_email.toLowerCase();
  const {emailId} = req.body;

  student.findOne({emailId:emailId},function(error,result){
    if(error){
      console.log('Error in querying the database');
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
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
      if(req.file){
        result.profilePictureUrl = req.file.filename;
      }
      result.save(function(updateError){
        if(updateError){
          console.log('Error in studentUpdateProfile');
          res.send('Error');
        }
        console.log('Student Profile Updated');
        res.send('Updated');
      });
    }
  });
};

const createEducation = (req, res) => {
  console.log('Inside createEducation');
  console.log(req.body);
  const education = {
    name : req.body.collegeName.toLowerCase(),
    city: req.body.city.toLowerCase(),
    state: req.body.cstate.toLowerCase(),
    country: req.body.country.toLowerCase(),
    degree: req.body.degree.toLowerCase(),
    major: req.body.major,
    yearOfPassing: req.body.yearOfPassing,
    cgpa: req.body.cgpa
  }
  const {emailId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else {
      console.log(result);
      result.educations.push(education);
      result.save()
      .then(()=>{
        res.send('Success');
      }).catch((err)=>{
        console.log("Inside catch of createEducation")
        res.send('Error');
      });
    }
  });
};

const createExperience = (req, res) => {
  console.log('Inside createExperience');
  console.log(req.body);
  const experience = {
    name : req.body.companyName.toLowerCase(),
    title: req.body.title.toLowerCase(),
    city: req.body.city.toLowerCase(),
    state: req.body.cstate.toLowerCase(),
    country: req.body.country.toLowerCase(),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    workDescription: req.body.description
  }
  const {emailId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else {
      console.log(result);
      result.experiences.push(experience);
      result.save()
      .then(()=>{
        res.send('Success');
      }).catch((err)=>{
        console.log("Inside catch of createExperience")
        res.send('Error');
      });
    }
  });
};

const deleteEducation = (req, res) => {
  console.log('Inside deleteEducation');
  console.log(req.body);
  const {emailId, educationId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
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
      if(idx !== -1){
        result.educations.splice(idx,1);
        result.save()
        .then(()=>{
          res.send('Success');
        }).catch((err)=>{
          console.log("Inside catch of deleteEducation")
          res.send('Error');
        });
      } else res.send('Error');
    }
  });
};

const deleteExperience = (req, res) => {
  console.log('Inside deleteExperience');
  console.log(req.body);
  const {emailId, experienceId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
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
          res.send('Success');
        }).catch((err)=>{
          console.log("Inside catch of deleteExperience")
          res.send('Error');
        });
      } else res.send('Error');
    }
  });
};

const updateEducation = (req, res) => {
  console.log('Inside updateEducation');
  console.log(req.body);
  const education = {
    name : req.body.collegeName.toLowerCase(),
    city: req.body.city.toLowerCase(),
    state: req.body.cstate.toLowerCase(),
    country: req.body.country.toLowerCase(),
    degree: req.body.degree.toLowerCase(),
    major: req.body.major,
    yearOfPassing: req.body.yearOfPassing,
    cgpa: req.body.cgpa
  }
  const {emailId, educationId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
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
          res.send('Success');
        }).catch((err)=>{
          console.log("Inside catch of updateEducation")
          res.send('Error');
        });
      }
      else res.send('Error');
    }
  });
};

const updateExperience = (req, res) => {
  console.log('Inside updateExperience');
  console.log(req.body);
  const experience = {
    name : req.body.companyName.toLowerCase(),
    title: req.body.title.toLowerCase(),
    city: req.body.city.toLowerCase(),
    state: req.body.cstate.toLowerCase(),
    country: req.body.country.toLowerCase(),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  }
  const {emailId, experienceId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
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
      if(idx!==-1)
      {
        result.experiences[idx] = experience;
        result.save()
        .then(()=>{
          res.send('Success');
        }).catch((err)=>{
          console.log("Inside catch of updateExperience")
          res.send('Error');
        });
      }
      else res.send('Error');
    }
  });
};

const updateSkillSet = (req, res) => {
  console.log('Inside updateSkills');
  console.log(req.body);
  console.log(req.body.skills);
  console.log(typeof req.body.skills);
  const {emailId} = req.body;
  student.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else {
      result.skills = req.body.skills;
      result.save()
      .then(()=>{
        res.send('Success');
      }).catch((err)=>{
        console.log("Inside catch of updateEducation")
        res.send('Error');
      });
    }
  });
}


exports.getStudentInfo = getStudentInfo;
exports.getCompanyInfo = getCompanyInfo;
exports.getStudentEducation = getStudentEducation;
exports.companyUpdateProfile = companyUpdateProfile;
exports.createEducation = createEducation;
exports.createExperience = createExperience;
exports.deleteEducation = deleteEducation;
exports.deleteExperience = deleteExperience;
exports.updateEducation = updateEducation;
exports.updateExperience = updateExperience;
exports.studentUpdateProfile = studentUpdateProfile;
exports.updateSkillSet = updateSkillSet;