const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const company = require('../models/company.model');
const student = require('../models/student.model');
const Config = require('../config');

function handle_request(msg, callback) {
  console.log('Inside handle_request of login');
  console.log(msg);
  const res = {};
  const { user } = msg;
  const { emailId } = msg;
  const { password } = msg;
  let modelToUse = '';
  if (user === 'company') {
    modelToUse = company;
  } else if (user === 'student') {
    modelToUse = student;
  } else {
    res.status = 401;
    res.message = 'Wrong UserRole Given';
    callback(null, res);
  }
  modelToUse.find({ emailId }, (err, results) => {
    if (err) {
      console.log(err);
      res.status = 500;
      res.message = 'Error';
      callback(null, res);
    }
    if (results.length === 0) {
      console.log(`User with email: ${emailId} and role: ${user} is not present`);
      res.status = 401;
      res.message = 'User Not Present';
      callback(null, res);
    } else {
      const foundUser = results[0];
      // console.log(foundUser);
      bcrypt.compare(password, foundUser.password, (pwdCompareError, pwdCompareResult) => {
        if (pwdCompareError) {
          console.log(`Password Compare Error: ${pwdCompareError}`);
          res.status = 500;
          res.message = 'Error in comparing Password';
          callback(null, res);
        }
        if (!pwdCompareResult) {
          res.status = 401;
          res.message = 'Wrong Password';
          callback(null, res);
        } else {
          console.log('Correct password given');
          const payload = {
            _id: foundUser._id, name: foundUser.name, profilePictureUrl: foundUser.profilePictureUrl, userRole: user,
          };
          console.log(payload);
          const token = jwt.sign(payload, Config.secret, {
            expiresIn: 1008000,
          });
          // console.log(token);
          res.status = 200;
          res.message = { token: `JWT ${token}` };
          callback(null, res);
        }
      });
    }
  });
}

exports.handle_request = handle_request;
