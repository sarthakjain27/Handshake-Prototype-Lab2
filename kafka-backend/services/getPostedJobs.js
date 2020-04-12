const company = require('../models/company.model');

function handle_request(msg, callback) {
  if (msg.companyName && msg.title) {
    console.log('Both company name and title given. So sending error out :p');
    callback(null, 'Error');
  } else if (msg.companyName) {
    company.findOne({ name: { $regex: msg.companyName, $options: 'i' } }, {
      _id: 1, name: 1, jobPostings: 1, emailId: 1,
    }, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, 'Error');
      } else {
        console.log(result);
        if (result === null) {
          callback(null, []);
        } else {
          const resultToSend = [];
          result.jobPostings.forEach((eachPosting) => {
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            const each = {
              _idCompany: result._id,
              name: result.name,
              emailId: result.emailId,
              title: eachPosting.title,
              _id: eachPosting._id,
              postingDate: eachPosting.postingDate,
              deadlineDate: eachPosting.deadlineDate,
              city: eachPosting.city,
              state: eachPosting.state,
              country: eachPosting.country,
              salary: eachPosting.salary,
              description: eachPosting.description,
              category: eachPosting.category,
            };
            // console.log(each);
            resultToSend.push(each);
          });
          callback(null, resultToSend);
        }
      }
    });
  } else if (msg.title) {
    company.find({ 'jobPostings.title': { $regex: msg.title, $options: 'i' } }, {
      _id: 1, name: 1, jobPostings: 1, emailId: 1,
    }, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, 'Error');
      } else {
        const resultToSend = [];
        result.forEach((eachCompany) => {
          eachCompany.jobPostings.forEach((eachPosting) => {
            if (eachPosting.title.includes(msg.title.toLowerCase())) {
              // Since eachPost itself would have _id so changing company's _id to _idCompany
              const each = {
                _idCompany: eachCompany._id,
                name: eachCompany.name,
                emailId: eachCompany.emailId,
                title: eachPosting.title,
                _id: eachPosting._id,
                postingDate: eachPosting.postingDate,
                deadlineDate: eachPosting.deadlineDate,
                city: eachPosting.city,
                state: eachPosting.state,
                country: eachPosting.country,
                salary: eachPosting.salary,
                description: eachPosting.description,
                category: eachPosting.category,
              };
              // console.log(each);
              resultToSend.push(each);
            }
          });
        });
        callback(null, resultToSend);
      }
    });
  } else {
    company.find({}, {
      _id: 1, name: 1, jobPostings: 1, emailId: 1,
    }, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, 'Error');
      } else {
        const resultToSend = [];
        result.forEach((eachCompany) => {
          // console.log(eachCompany);
          eachCompany.jobPostings.forEach((eachPosting) => {
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            const each = {
              _idCompany: eachCompany._id,
              name: eachCompany.name,
              emailId: eachCompany.emailId,
              title: eachPosting.title,
              _id: eachPosting._id,
              postingDate: eachPosting.postingDate,
              deadlineDate: eachPosting.deadlineDate,
              city: eachPosting.city,
              state: eachPosting.state,
              country: eachPosting.country,
              salary: eachPosting.salary,
              description: eachPosting.description,
              category: eachPosting.category,
            };
            // console.log(each);
            resultToSend.push(each);
          });
        });
        callback(null, resultToSend);
      }
    });
  }
}

exports.handle_request = handle_request;
