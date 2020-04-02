const kafka = require('../kafka/client');

const companySearchForStudents = (req, res) => {
  console.log('Inside companySearchForStudents');
  console.log(req.body);
  kafka.make_request('searchStudents', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

exports.companySearchForStudents = companySearchForStudents;