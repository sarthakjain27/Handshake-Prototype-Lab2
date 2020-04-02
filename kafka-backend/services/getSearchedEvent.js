const company = require('../models/company.model');

function handle_request(msg, callback){
  if(msg.eventName) {
    console.log('EventName Provided');
    company.find({'eventPostings.name':{ $regex: msg.eventName, $options: 'i' }},{_id:1,profilePictureUrl:1,name:1,eventPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        callback(null,'Error');
      } else {
        let resultToSend = [];
        result.forEach(function(eachCompany){
          //console.log(eachCompany);
          eachCompany.eventPostings.forEach(function(eachPosting){
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            if(eachPosting.name.includes(msg.eventName.toLowerCase())){
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
            }
          });
        });
        console.log(resultToSend);
        callback(null,resultToSend);
      }
    })
  } else {
    company.find({},{_id:1,profilePictureUrl:1,name:1,eventPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        callback(null,'Error');
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
        callback(null,resultToSend);
      }
    });
  }
};

exports.handle_request = handle_request;