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

const createEvent = (req, res) => {
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

const getSearchedEvent = (req, res) => {
  console.log('Inside getSearchedEvent');
  console.log(req.body);
  if(req.body.eventName) {
    company.find({'eventPostings.name':{ $regex: req.body.eventName, $options: 'i' }},{_id:1,profilePictureUrl:1,name:1,eventPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        res.send('Error');
      } else {
        let resultToSend = [];
        result.forEach(function(eachCompany){
          //console.log(eachCompany);
          eachCompany.eventPostings.forEach(function(eachPosting){
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            let each = {
              _idCompany:eachCompany._id,
              profile_picture_url:eachCompany.profilePictureUrl,
              name:eachCompany.name,
              emailId:eachCompany.emailId,
              _idEvent:eachPosting._id,
              eligibility:eachPosting.eligibility,
              eventName:eachPosting.name,
              description:eachPosting.description,
              date:eachPosting.date,
              time:eachPosting.time,
              street:eachPosting.street,
              city:eachPosting.city,
              state:eachPosting.state,
              country:eachPosting.country,
              zipcode:eachPosting.zipcode,
            }
            // console.log(each);
            resultToSend.push(each);
          });
        });
        res.send(resultToSend);
      }
    })
  } else {
    company.find({},{_id:1,profilePictureUrl:1,name:1,eventPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        res.send('Error');
      } else {
        let resultToSend = [];
        result.forEach(function(eachCompany){
          //console.log(eachCompany);
          eachCompany.eventPostings.forEach(function(eachPosting){
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            let each = {
              _idCompany:eachCompany._id,
              profile_picture_url:eachCompany.profilePictureUrl,
              name:eachCompany.name,
              emailId:eachCompany.emailId,
              _idEvent:eachPosting._id,
              eligibility:eachPosting.eligibility,
              eventName:eachPosting.name,
              description:eachPosting.description,
              date:eachPosting.date,
              time:eachPosting.time,
              street:eachPosting.street,
              city:eachPosting.city,
              state:eachPosting.state,
              country:eachPosting.country,
              zipcode:eachPosting.zipcode,
            }
            // console.log(each);
            resultToSend.push(each);
          });
        });
        res.send(resultToSend);
      }
    });
  }
}

const registerForEvent = (req, res) => {
  console.log('Inside registerForEvent');
  console.log(req.body);
  const { eventId, studentId, companyName } = req.body;
  company.findOne({name:companyName},function(error,result){
    if(error){
      console.log(error);
      res.send('Error');
    } if(result === null){
      console.log(companyName+' Company Not Found');
      res.send('Company Not Found');
    }
    let i=0;
    let alreadyApplied = false;
    for(var eachPosting of result.eventPostings){
      // eventId is string and eachPosting._id is Object so using double equals and not ===
      if(eachPosting._id == eventId){
        console.log('Posting found');
        if(eachPosting.registeredStudents.includes(studentId)){
          alreadyApplied = true;
        }
        break;
      }
      i++;
    }
    if(alreadyApplied){
      res.send('Already applied');
    } else {
      result.eventPostings[i].registeredStudents.push(studentId);
      result.save(function(error){
        if(error){
          console.log(error);
          res.send('Error');
        }
        res.send('Successfully Applied');
      });
    }
  });
}

const getRegisteredEvents = (req, res) => {
  console.log('Inside getRegisteredEvents');
  const {emailId} = req.body;
  company.find({}, function(error, results){
    if(error){
      console.log(error);
      res.send('Error');
    } if(results.length === 0){
      console.log('No Company Available');
      res.send('No Company Available');
    }
    const appliedEvents = [];
    for(var result of results){
      for(var eachPosting of result.eventPostings){
        for(var eachStudent of eachPosting.registeredStudents){
          if(eachStudent.studentId === emailId){
            let obj = {
                        profile_picture_url:result.profilePictureUrl,
                        company_name:result.name,
                        _idCompany:result._id,
                        emailId:result.emailId,
                        _idEvent:eachPosting._id,
                        eligibility:eachPosting.eligibility,
                        eventName:eachPosting.name,
                        description:eachPosting.description,
                        date:eachPosting.date,
                        time:eachPosting.time,
                        street:eachPosting.street,
                        city:eachPosting.city,
                        state:eachPosting.state,
                        country:eachPosting.country,
                        zipcode:eachPosting.zipcode,
                      }
            appliedEvents.push(obj);
            break;
          }
        }
      }
    }
    res.send(appliedEvents);
  });
}

exports.listCompanyPostedEvents = listCompanyPostedEvents;
exports.createEvent = createEvent;
exports.getSearchedEvent = getSearchedEvent;
exports.registerForEvent = registerForEvent;
exports.getRegisteredEvents = getRegisteredEvents;