// inbuilt package imports
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');

const Config = require('./config');
const Signup = require('./apis/signup');
const Login = require('./apis/login');
const JobComponent = require('./apis/jobComponent');
const EventComponent = require('./apis/eventComponent');
const ProfileComponent = require('./apis/profileComponent');
const SearchComponent = require('./apis/searchComponent');
const MessageComponent = require('./apis/messageComponent');
const { checkAuth } = require("./passport");

const app = express();
// setting view engine
app.set('view engine', 'ejs');
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(session({
  secret: 'sarthak_handshake_secure_string',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));
app.use(cors({ origin: `${Config.applicationAddress}:${Config.applicationPort}`, credentials: true }));
app.use(express.static('./ProfilePictures/Company'));
app.use(express.static('./ProfilePictures/Student'));
app.use(express.static('./ProfilePictures/Common'));
app.use(express.static('./Resume/JobApplication'));
app.use(express.static('./WebsiteImages'));



app.post('/signup', (req, res) => {
  Signup.signup(req, res);
});

app.post('/login', (req, res) => {
  Login.login(req, res);
});

app.post('/createJobPost', checkAuth, (req, res) => {
  JobComponent.createJobPost(req, res);
});

app.post('/listCompanyPostedJobs', checkAuth, (req, res) => {
  JobComponent.listCompanyPostedJobs(req, res);
});

app.post('/getStudentInfo',  checkAuth, (req, res) => {
  ProfileComponent.getStudentInfo(req, res);
});

app.post('/getCompanyInfo', checkAuth, (req, res) => {
  ProfileComponent.getCompanyInfo(req,res);
});

const companyProfilePictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './ProfilePictures/Company');
  },
  filename(req, file, cb) {
    console.log('Inside filename');
    console.log(req.body)
    cb(null, `company_${req.body.emailId}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  },
});

const companyProfilePictureUpload = multer({ storage: companyProfilePictureStorage });

app.post('/updateCompanyProfile', checkAuth, companyProfilePictureUpload.single('file'), (req, res) => {
  ProfileComponent.companyUpdateProfile(req, res);
});

app.post('/getPostedJobs', checkAuth, (req, res) => {
  JobComponent.getPostedJobs(req, res);
});

const studentResumeFileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './Resume/JobApplication');
  },
  filename(req, file, cb) {
    cb(null, `${req.body.studentId}_${req.body.jobPostId}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  },
});

const studentResumeFileUpload = multer({ storage: studentResumeFileStorage });

app.post('/applyForJob', checkAuth, studentResumeFileUpload.single('file'), (req, res) => {
  JobComponent.applyForJob(req, res);
});

app.post('/getAppliedJobs', checkAuth, (req, res) => {
  JobComponent.getAppliedJobs(req, res);
});

app.post('/updateAppliedStudentJobStatus', checkAuth, (req, res) => {
  JobComponent.updateAppliedStudentJobStatus(req, res);
});

app.post('/listCompanyCreatedEvents', checkAuth, (req, res) => {
  EventComponent.listCompanyPostedEvents(req, res);
});

app.post('/createEvent', checkAuth, (req, res) => {
  EventComponent.createEvent(req, res);
});

app.post('/registerForEvent', checkAuth, (req, res) => {
  EventComponent.registerForEvent(req, res);
});

app.post('/getSearchedEvent', checkAuth, (req, res) => {
  EventComponent.getSearchedEvent(req, res);
});

app.post('/getStudentAllEducation', checkAuth, (req, res) => {
  ProfileComponent.getStudentEducation(req, res);
});

const studentProfilePictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './ProfilePictures/Student');
  },
  filename(req, file, cb) {
    console.log('Inside filename');
    console.log(req.body)
    cb(null, `student_${req.body.emailId}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  },
});

const studentProfilePictureUpload = multer({ storage: studentProfilePictureStorage });

app.post('/updateStudentProfile', checkAuth, studentProfilePictureUpload.single('file'), (req, res) => {
  ProfileComponent.studentUpdateProfile(req, res);
});

app.post('/createEducation', checkAuth, (req, res) => {
  ProfileComponent.createEducation(req, res);
});

app.post('/updateEducation', checkAuth, (req, res) => {
  ProfileComponent.updateEducation(req, res);
});

app.post('/deleteEducation', checkAuth, (req, res) => {
  ProfileComponent.deleteEducation(req, res);
});

app.post('/createProfessionalExperience', checkAuth, (req, res) => {
  ProfileComponent.createExperience(req, res);
});

app.post('/updateProfessionalExperience', checkAuth, (req, res) => {
  ProfileComponent.updateExperience(req, res);
});

app.post('/deleteProfessionalExperience', checkAuth, (req, res) => {
  ProfileComponent.deleteExperience(req, res);
});

app.post('/getRegisteredEvents', checkAuth, (req, res) => {
  EventComponent.getRegisteredEvents(req, res);
});

app.post('/updateSkills', checkAuth, (req, res) => {
  ProfileComponent.updateSkillSet(req, res);
});

app.post('/getStudentsRegisteredInAEvent', checkAuth, (req, res) => {
  EventComponent.getStudentsRegisteredInAEvent(req, res);
});

app.post('/searchStudents', checkAuth, (req, res) => {
  SearchComponent.companySearchForStudents(req, res);
});

app.post('/addMessageInAConversation', checkAuth, (req, res) => {
  MessageComponent.addMessageInAConversation(req, res);
});

app.post('/getAllMessageOFAConversation', checkAuth, (req, res) => {
  MessageComponent.getAllMessageOFAConversation(req, res);
});

app.post('/getAllConversationsOfAUser', checkAuth, (req, res)=>{
  MessageComponent.getAllConversations(req, res);
})

module.exports = app;

const server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
