// inbuilt package imports
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');

const saltRounds = 10;

const Database=require('./Database');
const Config = require('./config');
const Signup = require('./apis/signup');
const Login = require('./apis/login');
// const JobComponent = require('./apis/jobComponent');
// const EventComponent = require('./apis/eventComponent');
// const ProfileComponent = require('./apis/profileComponent');
// const SkillSetComponent = require('./apis/skillSetComponent');
// const SearchComponent = require('./apis/searchComponent');

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
  saveUninitialized: true,
}));
app.use(cors({ origin: `${Config.applicationAddress}:${Config.applicationPort}`, credentials: true }));
app.use(express.static('./ProfilePictures/Company'));
app.use(express.static('./ProfilePictures/Student'));
app.use(express.static('./ProfilePictures/Common'));
app.use(express.static('./Resume/JobApplication'));
app.use(express.static('./WebsiteImages'));




app.post('/signup', (req, res) => {
  Signup.signup(req, res, bcrypt, saltRounds);
});

app.post('/login', (req, res) => {
  Login.login(req, res, bcrypt);
});

const server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
