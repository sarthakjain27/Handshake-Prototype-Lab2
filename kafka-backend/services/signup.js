const bcrypt = require('bcrypt');
const company = require('../models/company.model');
const student = require('../models/student.model');

function handle_request(msg, callback) {
  const saltRounds = 10;
  const { user } = msg;
  const { emailId } = msg;
  const { password } = msg;
  const name = msg.name.toLowerCase();
  let modelToUse = student;
  if (user === 'company') {
    modelToUse = company;
  }
  modelToUse.find({ emailId }, (err, results) => {
    if (err) {
      console.log(err);
      callback(null, 'Error');
    }
    if (results.length > 0) {
      console.log(`${emailId} for the role ${user} already exists`);
      callback(null, 'Exists');
    } else {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          console.log(error);
          callback(null, 'Hashing Error');
        }
        let userToCreate = '';
        if (user === 'company') {
          userToCreate = company({
            emailId,
            password: hash,
            name,
            city: msg.city.toLowerCase(),
            state: msg.state.toLowerCase(),
            country: msg.country.toLowerCase(),
          });
        } else {
          userToCreate = student({
            emailId,
            password: hash,
            name,
            collegeName: msg.collegeName.toLowerCase(),
          });
        }
        userToCreate.save((error) => {
          if (error) {
            console.log(`Saving Error in Signup: ${error}`);
            callback(null, 'Saving Error');
          }
          console.log('Successfully Created');
          callback(null, 'User successfully created');
        });
      });
    }
  });
}

exports.handle_request = handle_request;
