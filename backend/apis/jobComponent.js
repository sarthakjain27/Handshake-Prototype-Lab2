const kafka = require('../kafka/client');

const listCompanyPostedJobs = (req, res) => {
  console.log('Inside listCompanyPostedJobs module:');
  console.log(req.body);
  kafka.make_request('listCompanyPostedJobs', req.body, (err, results) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(results);
    }
  });
};

const createJobPost = (req, res) => {
  console.log('Inside createJobPost module:');
  console.log(req.body);
  kafka.make_request('createJobPost', req.body, (err, results) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(results);
    }
  });
};

const getPostedJobs = (req, res) => {
  console.log('Inside getPostedJobs');
  console.log(req.body);
  kafka.make_request('getPostedJobs', req.body, (err, results) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(results);
    }
  });
};

const applyForJob = (req, res) => {
  console.log('Inside applyForJob');
  console.log(req.body);
  if (req.file) {
    console.log('Student Resume File Uploaded');
    console.log(req.file);
  }
  kafka.make_request('applyForJob', req, (err, results) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(results);
    }
  });
};

const updateAppliedStudentJobStatus = (req, res) => {
  console.log('Inside updateAppliedStudentJobStatus');
  console.log(req.body);
  kafka.make_request('updateAppliedStudentJobStatus', req.body, (err, results) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(results);
    }
  });
};

const getAppliedJobs = (req, res) => {
  console.log('Inside getAppliedJobs');
  console.log(req.body);
  kafka.make_request('getAppliedJobs', req.body, (err, results) => {
    if (err) {
      res.send('Error');
    } else {
      res.send(results);
    }
  });
};


exports.listCompanyPostedJobs = listCompanyPostedJobs;
exports.createJobPost = createJobPost;
exports.getPostedJobs = getPostedJobs;
exports.applyForJob = applyForJob;
exports.updateAppliedStudentJobStatus = updateAppliedStudentJobStatus;
exports.getAppliedJobs = getAppliedJobs;
