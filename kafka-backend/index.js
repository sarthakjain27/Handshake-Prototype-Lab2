const Database = require('./Database');

const connection = new require('./kafka/Connection');

// topics files
const SignUp = require('./services/signup');
const Login = require('./services/login');
const Passport = require('./services/passport');
const CreateJobPost = require('./services/createJobPost');
const ListCompanyPostedJobs = require('./services/listCompanyPostedJobs');
const GetStudentInfo = require('./services/getStudentInfo');
const GetCompanyInfo = require('./services/getCompanyInfo');
const UpdateCompanyProfile = require('./services/updateCompanyProfile');
const GetPostedJobs = require('./services/getPostedJobs');
const ApplyForJob = require('./services/applyForJob');
const GetAppliedJobs = require('./services/getAppliedJobs');
const UpdateAppliedStudentJobStatus = require('./services/updateAppliedStudentJobStatus');
const ListCompanyCreatedEvents = require('./services/listCompanyCreatedEvents');
const CreateEvent = require('./services/createEvent');
const RegisterForEvent = require('./services/registerForEvent');
const GetSearchedEvent = require('./services/getSearchedEvent');
const GetStudentAllEducation = require('./services/getStudentAllEducation');
const UpdateStudentProfile = require('./services/updateStudentProfile');
const CreateEducation = require('./services/createEducation');
const UpdateEducation = require('./services/updateEducation');
const DeleteEducation = require('./services/deleteEducation');
const CreateProfessionalExperience = require('./services/createProfessionalExperience');
const UpdateProfessionalExperience = require('./services/updateProfessionalExperience');
const DeleteProfessionalExperience = require('./services/deleteProfessionalExperience');
const GetRegisteredEvents = require('./services/getRegisteredEvents');
const UpdateSkills = require('./services/updateSkills');
const GetStudentsRegisteredInAEvent = require('./services/getStudentsRegisteredInAEvent');
const SearchStudents = require('./services/searchStudents');
const AddMessageInAConversation = require('./services/addMessageInAConversation');
const GetAllMessageOFAConversation = require('./services/getAllMessageOFAConversation');
const GetAllConversationsOfAUser = require('./services/getAllConversationsOfAUser');


function handleTopicRequest(topicName, fname) {
  // var topic_name = 'root_topic';
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  console.log('Kafka server is running ');
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName}`);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    // Handling the make request that was called from backend server here in this function.
    fname.handle_request(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (error, producerData) => {
        console.log(producerData);
      });
    });
  });
}

handleTopicRequest('signup', SignUp);
handleTopicRequest('login', Login);
handleTopicRequest('passport', Passport);
handleTopicRequest('createJobPost', CreateJobPost);
handleTopicRequest('listCompanyPostedJobs', ListCompanyPostedJobs);
handleTopicRequest('getStudentInfo', GetStudentInfo);
handleTopicRequest('getCompanyInfo', GetCompanyInfo);
handleTopicRequest('updateCompanyProfile', UpdateCompanyProfile);
handleTopicRequest('getPostedJobs', GetPostedJobs);
handleTopicRequest('applyForJob', ApplyForJob);
handleTopicRequest('getAppliedJobs', GetAppliedJobs);
handleTopicRequest('updateAppliedStudentJobStatus', UpdateAppliedStudentJobStatus);
handleTopicRequest('listCompanyCreatedEvents', ListCompanyCreatedEvents);
handleTopicRequest('createEvent', CreateEvent);
handleTopicRequest('registerForEvent', RegisterForEvent);
handleTopicRequest('getSearchedEvent', GetSearchedEvent);
handleTopicRequest('getStudentAllEducation', GetStudentAllEducation);
handleTopicRequest('updateStudentProfile', UpdateStudentProfile);
handleTopicRequest('createEducation', CreateEducation);
handleTopicRequest('updateEducation', UpdateEducation);
handleTopicRequest('deleteEducation', DeleteEducation);
handleTopicRequest('createProfessionalExperience', CreateProfessionalExperience);
handleTopicRequest('updateProfessionalExperience', UpdateProfessionalExperience);
handleTopicRequest('deleteProfessionalExperience', DeleteProfessionalExperience);
handleTopicRequest('getRegisteredEvents', GetRegisteredEvents);
handleTopicRequest('updateSkills', UpdateSkills);
handleTopicRequest('getStudentsRegisteredInAEvent', GetStudentsRegisteredInAEvent);
handleTopicRequest('searchStudents', SearchStudents);
handleTopicRequest('addMessageInAConversation', AddMessageInAConversation);
handleTopicRequest('getAllMessageOFAConversation', GetAllMessageOFAConversation);
handleTopicRequest('getAllConversationsOfAUser', GetAllConversationsOfAUser);
