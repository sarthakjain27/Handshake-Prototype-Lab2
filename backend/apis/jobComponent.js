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
        res.send('Job Post Created Successfully');
      }).catch((err)=>{
        console.log("Inside catch of createJobPost")
        res.send('Error');
      });
    }
  });
}


exports.listCompanyPostedJobs = listCompanyPostedJobs;
exports.createJobPost = createJobPost;