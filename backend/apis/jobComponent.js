const company = require('../models/company.model');

const listCompanyPostedJobs = (req, res) => {
  console.log('Inside listCompanyPostedJobs module:');
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
      res.send(result.jobPostings);
    }
  });
}

const createJobPost = (req, res) => {
  console.log('Inside createJobPost module:');
  console.log(req.body);
  const posting = {
    title:req.body.title.toLowerCase(),
    postingDate:req.body.postingDate,
    deadlineDate:req.body.deadlineDate,
    city:req.body.city.toLowerCase(),
    state:req.body.cstate.toLowerCase(),
    country:req.body.country.toLowerCase(),
    salary:req.body.salary,
    description:req.body.description,
    category:req.body.category
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
      result.jobPostings.push(posting);
      result.save()
      .then(()=>{
        res.send('Success');
      }).catch((err)=>{
        console.log("Inside catch of createJobPost")
        res.send('Error');
      });
    }
  });
}

const getPostedJobs = (req, res) => {
  console.log('Inside getPostedJobs');
  console.log(req.body);
  if(req.body.companyName && req.body.title){
    console.log('Both company name and title given. So sending error out :p');
    res.send('Error');
  } else if(req.body.companyName){
    company.findOne({'name':{ $regex: req.body.companyName, $options: 'i' }},{_id:1,name:1,jobPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        res.send('Error');
      } else {
        console.log(result);
        if(result === null)
        {
          res.send([]);
        } else {
          let resultToSend = [];
          result.jobPostings.forEach((eachPosting)=>{
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            let each = {
              _idCompany:result._id,
              name:result.name,
              emailId:result.emailId,
              title:eachPosting.title,
              _id:eachPosting._id,
              postingDate:eachPosting.postingDate,
              deadlineDate:eachPosting.deadlineDate,
              city:eachPosting.city,
              state:eachPosting.state,
              country:eachPosting.country,
              salary:eachPosting.salary,
              description:eachPosting.description,
              category:eachPosting.category
            }
            // console.log(each);
            resultToSend.push(each);
          });
          res.send(resultToSend);
        }
      }
    })
  } else if(req.body.title){
    company.find({'jobPostings.title':{ $regex: req.body.title, $options: 'i' }},{_id:1,name:1,jobPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        res.send('Error');
      } else {
        let resultToSend = [];
        result.forEach((eachCompany)=>{
          eachCompany.jobPostings.forEach((eachPosting)=>{
            if(eachPosting.title.includes(req.body.title.toLowerCase())){
              // Since eachPost itself would have _id so changing company's _id to _idCompany
              let each = {
                _idCompany:eachCompany._id,
                name:eachCompany.name,
                emailId:eachCompany.emailId,
                title:eachPosting.title,
                _id:eachPosting._id,
                postingDate:eachPosting.postingDate,
                deadlineDate:eachPosting.deadlineDate,
                city:eachPosting.city,
                state:eachPosting.state,
                country:eachPosting.country,
                salary:eachPosting.salary,
                description:eachPosting.description,
                category:eachPosting.category
              }
              // console.log(each);
              resultToSend.push(each);
            }
          });
        });
        res.send(resultToSend);
      }
    })
  } else {
    company.find({},{_id:1,name:1,jobPostings:1,emailId:1},function(err,result){
      if (err) {
        console.log(err);
        res.send('Error');
      } else {
        let resultToSend = [];
        result.forEach(function(eachCompany){
          //console.log(eachCompany);
          eachCompany.jobPostings.forEach(function(eachPosting){
            // Since eachPost itself would have _id so changing company's _id to _idCompany
            let each = {
              _idCompany:eachCompany._id,
              name:eachCompany.name,
              emailId:eachCompany.emailId,
              title:eachPosting.title,
              _id:eachPosting._id,
              postingDate:eachPosting.postingDate,
              deadlineDate:eachPosting.deadlineDate,
              city:eachPosting.city,
              state:eachPosting.state,
              country:eachPosting.country,
              salary:eachPosting.salary,
              description:eachPosting.description,
              category:eachPosting.category
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

const applyForJob = (req, res) => {
  console.log('Inside applyForJob');
  console.log(req.body);
  if (req.file) {
    console.log('Student Resume File Uploaded');
    console.log(req.file);
  }
  const { jobPostId, studentId, date, companyName } = req.body;
  const resumeLocation = req.file.filename;
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
    for(var eachPosting of result.jobPostings){
      // jobPostId is string and eachPosting._id is Object so using double equals and not ===
      if(eachPosting._id == jobPostId){
        console.log('Posting found');
        for(var eachStudent of eachPosting.registeredStudents){
          if(eachStudent.studentId === studentId){
            alreadyApplied = true;
            break;
          }
        }
        break;
      }
      i++;
    }
    if(alreadyApplied){
      res.send('Already applied');
    } else {
      result.jobPostings[i].registeredStudents.push({studentId:studentId,status:'pending',resumeFileUrl:resumeLocation,applyingDate:date});
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

const updateAppliedStudentJobStatus = (req, res) => {
  console.log('Inside updateAppliedStudentJobStatus');
  console.log(req.body);

  const {status, jobApplicationId, jobId, emailId} = req.body;
  company.findOne({emailId: emailId},function(error,result){
    if(error){
      console.log(error);
      res.send('Error');
    } if(result === null){
      console.log('Company not found with emailId: '+emailId);
      res.send('Company Not Found');
    }
    let i=0,j=0;
    for(var eachPosting of result.jobPostings){
      if(eachPosting._id == jobId){
        console.log('Posting found');
        for(var eachStudent of eachPosting.registeredStudents){
          if(eachStudent._id == jobApplicationId){
            break;
          }
          j++;
        }
        break;
      }
      i++;
    }
    result.jobPostings[i].registeredStudents[j].status=status;
    result.save(function(error){
      if(error){
        console.log(error);
        res.send('Error');
      }
      res.send('Updated');
    });
  })
}

const getAppliedJobs = (req, res) => {
  console.log('Inside getAppliedJobs');
  console.log(req.body);
  const {emailId} = req.body;
  company.find({}, function(error, results){
    if(error){
      console.log(error);
      res.send('Error');
    } if(results.length === 0){
      console.log('No Company Available');
      res.send('No Company Available');
    }
    const appliedJobs = [];
    for(var result of results){
      //console.log(result);
      for(var eachPosting of result.jobPostings){
        for(var eachStudent of eachPosting.registeredStudents){
          if(eachStudent.studentId === emailId){
            let obj = {
                        profile_picture_url:result.profilePictureUrl,
                        job_title:eachPosting.title,
                        city:eachPosting.city,
                        state:eachPosting.state,
                        country:eachPosting.country,
                        company_name:result.name,
                        status:eachStudent.status,
                        applying_date:eachStudent.applyingDate,
                        application_deadline:eachPosting.deadlineDate
                      }
            appliedJobs.push(obj);
            break;
          }
        }
      }
    }
    console.log(appliedJobs);
    res.send(appliedJobs);
  })
}


exports.listCompanyPostedJobs = listCompanyPostedJobs;
exports.createJobPost = createJobPost;
exports.getPostedJobs = getPostedJobs;
exports.applyForJob = applyForJob;
exports.updateAppliedStudentJobStatus = updateAppliedStudentJobStatus;
exports.getAppliedJobs = getAppliedJobs;