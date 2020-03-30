const company = require('../models/company.model');
const student = require('../models/student.model');
const jwt = require('jsonwebtoken');
const { auth } = require('../passport');
const Config = require('../config');
auth();

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
  } else res.status(401).send('Wrong UserRole Given');
  modelToUse.find({emailId:emailId},function(err,results){
    if (err) {
      console.log(err);
      res.status(500).send('Error');
    }
    if(results.length === 0){
      console.log(`User with email: ${emailId} and role: ${user} is not present`);
      res.status(401).send('User Not Present');
    } else {
      const foundUser = results[0];
      //console.log(foundUser);
      bcrypt.compare(password, foundUser.password, (pwdCompareError, pwdCompareResult) => {
        if (pwdCompareError) {
          console.log('Password Compare Error: '+pwdCompareError);
          res.status(500).send('Error in comparing Password');
        }
        if (!pwdCompareResult) {
          res.status(401).send('Wrong Password');
        } else {
          console.log('Correct password given');
          const payload = {_id:foundUser._id,name:foundUser.name,profilePictureUrl:foundUser.profilePictureUrl,userRole:user};
          console.log(payload);
          const token = jwt.sign(payload, Config.secret, {
            expiresIn: 1008000
          });
          //console.log(token);
          res.status(200).send({token:"JWT "+token});
        }
      });
    }
  });
}


exports.login = login;