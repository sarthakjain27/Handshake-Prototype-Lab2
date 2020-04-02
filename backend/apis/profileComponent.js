const kafka = require('../kafka/client');

const getStudentInfo = (req, res) => {
  console.log('Inside getStudentInfo');
  console.log(req.body);
  kafka.make_request('getStudentInfo', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const getStudentEducation = (req, res) => {
  console.log('Inside getStudentEducation');
  console.log(req.body);
  kafka.make_request('getStudentAllEducation', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const getCompanyInfo = (req, res) => {
  console.log('Inside getCompanyInfo');
  console.log(req.body);
  kafka.make_request('getCompanyInfo', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const companyUpdateProfile = (req, res) => {
  console.log('Inside companyUpdateProfile');
  console.log(req.body);
  if (req.file) {
    console.log('Company Profile Picture Uploaded');
    console.log(req.file);
    req.body.filename = req.file.filename;
  }
  kafka.make_request('updateCompanyProfile', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const studentUpdateProfile = (req, res) => {
  console.log('Inside studentUpdateProfile');
  console.log(req.body);
  if (req.file) {
    console.log('Student Profile Picture Uploaded');
    console.log(req.file);
    req.body.filename = req.file.filename;
  }
  kafka.make_request('updateStudentProfile', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const createEducation = (req, res) => {
  console.log('Inside createEducation');
  console.log(req.body);
  kafka.make_request('createEducation', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const createExperience = (req, res) => {
  console.log('Inside createExperience');
  console.log(req.body);
  kafka.make_request('createProfessionalExperience', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const deleteEducation = (req, res) => {
  console.log('Inside deleteEducation');
  console.log(req.body);
  kafka.make_request('deleteEducation', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const deleteExperience = (req, res) => {
  console.log('Inside deleteExperience');
  console.log(req.body);
  kafka.make_request('deleteProfessionalExperience', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const updateEducation = (req, res) => {
  console.log('Inside updateEducation');
  console.log(req.body);
  kafka.make_request('updateEducation', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const updateExperience = (req, res) => {
  console.log('Inside updateExperience');
  console.log(req.body);
  kafka.make_request('updateProfessionalExperience', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const updateSkillSet = (req, res) => {
  console.log('Inside updateSkills');
  console.log(req.body);
  console.log(req.body.skills);
  console.log(typeof req.body.skills);
  
  kafka.make_request('updateSkills', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
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