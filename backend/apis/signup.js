const company = require('../models/company.model');
const student = require('../models/student.model');

const signup = (req, res, bcrypt, saltRounds) => {
  console.log('Inside signup module:');
  console.log(req.body);
  const { user } = req.body;
  const { emailId } = req.body;
  const { password } = req.body;
  const name = req.body.name.toLowerCase();
  let modelToUse = student;
  if(user === 'company'){
    modelToUse = company;
  }
  modelToUse.find({emailId:emailId},function(err,results){
    if (err) {
      console.log(err);
      res.send('Error');
    }
    if(results.length > 0){
      console.log(`${emailId} for the role ${user} already exists`);
      res.send('Exists');
    } else {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          console.log(error);
          res.send('Hashing Error');
        }
        let userToCreate = '';
        if (user === 'company') {
          userToCreate = company({
            emailId:emailId,
            password:hash,
            name:name,
            city:req.body.city.toLowerCase(),
            state:req.body.state.toLowerCase(),
            country:req.body.country.toLowerCase()
          });
        } else {
          userToCreate = student({
            emailId:emailId,
            password:hash,
            name:name,
            collegeName:req.body.collegeName.toLowerCase()
          });
        }
        userToCreate.save(function(error){
          if(error){
            console.log('Saving Error in Signup: '+error);
            res.send('Saving Error');
          }
          console.log('Successfully Created');
          res.send('User successfully created');
        });
      });
    }
  });
}

exports.signup = signup;