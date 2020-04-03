var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Handshake Application', function(){

    it('POST /getPostedJobs - Verifying posted jobs count',function(done){
        agent.post('/getPostedJobs').send({})
            .then(function(res){
                // console.log(res.body);
                expect(res.body.length).to.equal(10);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    
    it('POST /listCompanyPostedJobs - Verifying posted jobs count of company',function(done){
      agent.post('/listCompanyPostedJobs').send({emailId:'sarthakssj@gmail.com'})
          .then(function(res){
              // console.log(res.body);
              expect(res.body.length).to.equal(5);
              done();
          })
          .catch((e) => {
              done(e);
          });
    });

    it('POST /getAppliedJobs - Verifying count of Applied Jobs of Student',function(done){
      agent.post('/getAppliedJobs').send({emailId: 'sarthak.jain@sjsu.edu'})
          .then(function(res){
              // console.log(res.body);
              expect(res.body.length).to.equal(5);
              done();
          })
          .catch((e) => {
              done(e);
          });
    });

    it('POST /getRegisteredEvents - Verifying count of Registered Events of Student',function(done){
      agent.post('/getRegisteredEvents').send({emailId: 'sarthak.jain@sjsu.edu'})
          .then(function(res){
              // console.log(res.body);
              expect(res.body.length).to.equal(4);
              done();
          })
          .catch((e) => {
              done(e);
          });
    });

    it('POST /getAllEvents - Verifying posted events count',function(done){
        agent.post('/getSearchedEvent').send({})
            .then(function(res){
                expect(res.body.length).to.equal(5);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})