const company = require('../models/company.model');

function handle_request(msg, callback) {
  const emailId = msg.emailId.toLowerCase();
  const name = msg.companyName.toLowerCase();
  const city = msg.city.toLowerCase();
  const state = msg.cstate.toLowerCase();
  const country = msg.country.toLowerCase();
  const { description, contactPhone } = msg;
  const contactEmail = msg.contact_email.toLowerCase();

  company.findOne({ emailId }, (error, result) => {
    if (error) {
      console.log('Error in querying the database');
      callback(null, 'Error');
    } if (Object.keys(result).length === 0) {
      callback(null, 'User Not Present');
    } else {
      console.log(result);
      result.name = name;
      result.city = city;
      result.state = state;
      result.country = country;
      result.description = description;
      result.contactPhone = contactPhone;
      result.contactEmail = contactEmail;
      if (msg.filename) {
        result.profilePictureUrl = msg.filename;
      }
      result.save((updateError) => {
        if (updateError) {
          console.log('Error in companyUpdateProfile');
          callback(null, 'Error');
        }
        console.log('Company Profile Updated');
        callback(null, 'Updated');
      });
    }
  });
}

exports.handle_request = handle_request;
