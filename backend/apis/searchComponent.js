const student = require('../models/student.model');

const companySearchForStudents = (req, res) => {
  console.log('Inside companySearchForStudents');
  console.log(req.body);
  const { searchParam } = req.body;
  let queryParam = {}
  if (searchParam === 'Name') {
    queryParam = {'name':{ $regex: req.body.value, $options: 'i' }};
  } else if (searchParam === 'College Name') {
    queryParam = {'collegeName':{ $regex: req.body.value, $options: 'i' }};
  } else if (searchParam === 'Skill') {
    queryParam = {'skills': req.body.value};
  } else if (searchParam !== 'ALL') {
    res.send('Error');
  } 

  student.find(queryParam,function(error,result){
    if (error) {
      console.log(error);
      console.log('Error in companySearchForStudents');
      res.send('Error');
    }
    console.log(result);
    res.send(result);
  });
};

exports.companySearchForStudents = companySearchForStudents;