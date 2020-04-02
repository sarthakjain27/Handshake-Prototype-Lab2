const Database=require('./Database');
var connection =  new require('./kafka/Connection');

//topics files
var SignUp = require('./services/signup');
var Login = require('./services/login');
var Passport = require('./services/passport');
var CreateJobPost = require('./services/createJobPost');
var ListCompanyPostedJobs = require('./services/listCompanyPostedJobs');
var GetStudentInfo = require('./services/getStudentInfo');
var GetCompanyInfo = require('./services/getCompanyInfo');
var UpdateCompanyProfile = require('./services/updateCompanyProfile');
var GetPostedJobs = require('./services/getPostedJobs');
var ApplyForJob = require('./services/applyForJob');
var GetAppliedJobs = require('./services/getAppliedJobs');
var UpdateAppliedStudentJobStatus = require('./services/updateAppliedStudentJobStatus');
var ListCompanyCreatedEvents = require('./services/listCompanyCreatedEvents');
var CreateEvent = require('./services/createEvent');
var RegisterForEvent = require('./services/registerForEvent');
var GetSearchedEvent = require('./services/getSearchedEvent');
var GetStudentAllEducation = require('./services/getStudentAllEducation');
var UpdateStudentProfile = require('./services/updateStudentProfile');
var CreateEducation = require('./services/createEducation');
var UpdateEducation = require('./services/updateEducation');
var DeleteEducation = require('./services/deleteEducation');
var CreateProfessionalExperience = require('./services/createProfessionalExperience');
var UpdateProfessionalExperience = require('./services/updateProfessionalExperience');
var DeleteProfessionalExperience = require('./services/deleteProfessionalExperience');
var GetRegisteredEvents = require('./services/getRegisteredEvents');
var UpdateSkills = require('./services/updateSkills');
var GetStudentsRegisteredInAEvent = require('./services/getStudentsRegisteredInAEvent');
var SearchStudents = require('./services/searchStudents');
var AddMessageInAConversation = require('./services/addMessageInAConversation');
var GetAllMessageOFAConversation = require('./services/getAllMessageOFAConversation');
var GetAllConversationsOfAUser = require('./services/GetAllConversationsOfAUser');


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        // Handling the make request that was called from backend server here in this function.
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

handleTopicRequest("signup",SignUp);
handleTopicRequest("login",Login);
handleTopicRequest("passport",Passport);
handleTopicRequest("createJobPost",CreateJobPost);
handleTopicRequest("listCompanyPostedJobs",ListCompanyPostedJobs);
handleTopicRequest("getStudentInfo",GetStudentInfo);
handleTopicRequest("getCompanyInfo",GetCompanyInfo);
handleTopicRequest("updateCompanyProfile",UpdateCompanyProfile);
handleTopicRequest("getPostedJobs",GetPostedJobs);
handleTopicRequest("applyForJob",ApplyForJob);
handleTopicRequest("getAppliedJobs",GetAppliedJobs);
handleTopicRequest("updateAppliedStudentJobStatus",UpdateAppliedStudentJobStatus);
handleTopicRequest("listCompanyCreatedEvents",ListCompanyCreatedEvents);
handleTopicRequest("createEvent",CreateEvent);
handleTopicRequest("registerForEvent",RegisterForEvent);
handleTopicRequest("getSearchedEvent",GetSearchedEvent);
handleTopicRequest("getStudentAllEducation",GetStudentAllEducation);
handleTopicRequest("updateStudentProfile",UpdateStudentProfile);
handleTopicRequest("createEducation",CreateEducation);
handleTopicRequest("updateEducation",UpdateEducation);
handleTopicRequest("deleteEducation",DeleteEducation);
handleTopicRequest("createProfessionalExperience",CreateProfessionalExperience);
handleTopicRequest("updateProfessionalExperience",UpdateProfessionalExperience);
handleTopicRequest("deleteProfessionalExperience",DeleteProfessionalExperience);
handleTopicRequest("getRegisteredEvents",GetRegisteredEvents);
handleTopicRequest("updateSkills",UpdateSkills);
handleTopicRequest("getStudentsRegisteredInAEvent",GetStudentsRegisteredInAEvent);
handleTopicRequest("searchStudents",SearchStudents);
handleTopicRequest("addMessageInAConversation",AddMessageInAConversation);
handleTopicRequest("getAllMessageOFAConversation",GetAllMessageOFAConversation);
handleTopicRequest("getAllConversationsOfAUser",GetAllConversationsOfAUser);



