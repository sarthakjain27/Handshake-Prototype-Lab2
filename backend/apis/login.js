const company = require('../models/company.model');
const student = require('../models/student.model');

const login = (req, res, bcrypt) => {
  console.log('Inside login module:');
  console.log(req.body);
  const { user } = req.body;
  const { emailId } = req.body;
  const { password } = req.body;
  let modelToUse = '';
  if(user === 'company'){
    modelToUse = company;
  } else if(user === 'student'){
    modelToUse = student;
  } else res.send('Wrong UserRole Given');
  modelToUse.find({emailId:emailId},function(err,results){
    if (err) {
      console.log(err);
      res.send('Error');
    }
    if(results.length === 0){
      console.log(`User with email: ${emailId} and role: ${user} is not present`);
      res.send('User Not Present');
    } else {
      const foundUser = results[0];
      console.log(foundUser);
      bcrypt.compare(password, foundUser.password, (pwdCompareError, pwdCompareResult) => {
        if (pwdCompareError) {
          console.log('Password Compare Error: '+pwdCompareError);
          res.send('Error in comparing Password');
        }
        if (!pwdCompareResult) {
          res.send('Wrong Password');
        } else {
          console.log('Correct password given');
          res.send(foundUser);
        }
      });
    }
  });
}


exports.login = login;