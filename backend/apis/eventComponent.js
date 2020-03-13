const company = require('../models/company.model');

const listCompanyPostedEvents = (req, res) => {
  console.log('Inside listCompanyPostedEvents module:');
  console.log(req.body);
  const {emailId} = req.body;
  company.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    }
    if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else {
      console.log(result);
      res.send(result.eventPostings);
    }
  });
}

const createEvent = (req, res, pool) => {
  console.log('Inside createEvent module:');
  console.log(req.body);
  const posting = {
    name: req.body.eventName.toLowerCase(),
    description: req.body.description,
    time: req.body.time,
    date: req.body.date,
    street: req.body.street,
    city: req.body.city.toLowerCase(),
    state: req.body.cstate.toLowerCase(),
    country: req.body.country.toLowerCase(),
    zipcode: req.body.zipcode,
    eligibility: req.body.eligibility
  }
  const {emailId} = req.body;

  company.findOne({emailId:emailId},function(err,result){
    if (err) {
      console.log(err);
      res.send('Error');
    } 
    if(Object.keys(result).length === 0){
      res.send('User Not Present');
    } else {
      console.log(result);
      result.eventPostings.push(posting);
      result.save()
      .then(()=>{
        res.send('Success');
      }).catch((err)=>{
        console.log("Inside catch of createEvent: "+err);
        res.send('Error');
      });
    }
  });
};

exports.listCompanyPostedEvents = listCompanyPostedEvents;
exports.createEvent = createEvent;