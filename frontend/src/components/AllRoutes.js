import React from 'react';
import { Route } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// My common components import
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

// Company Components import
import CompanyHome from './Company/Home/CompanyHome';
import NewJobPost from './Company/JobsComponent/NewJobPost';
import JobAppliedStudents from './Company/Home/JobAppliedStudents';
import CompanyListEvents from './Company/EventComponent/ListEvents';
import NewEventPost from './Company/EventComponent/NewEventPost';
import CompanyProfile from './Company/Profile/CompanyProfile';
import EditCompanyProfile from './Company/Profile/Profile';
import EventRegisteredStudents from './Company/EventComponent/EventRegisteredStudents';
import SearchStudents from './Company/SearchStudents/SearchStudents';
import CompanyMessage from './Company/MessageComponent/MessageComponent';

// Student Components import
import StudentHome from './Student/Home/StudentHome';
import AppliedJobs from './Student/JobsComponent/AppliedJobs';
import StudentListEvents from './Student/EventsComponent/ListEvents';
import RegisteredEvents from './Student/EventsComponent/RegisteredEvents';
import StudentProfile from './Student/Profile/StudentProfile';
import EditStudentProfile from './Student/Profile/Profile';
import AddProfessionalExperienceStudent from './Student/Profile/AddExperience';
import AddEducationStudent from './Student/Profile/AddEducation';
import EditStudentProfessionalExperience from './Student/Profile/EditExperience';
import EditStudentEducation from './Student/Profile/EditEducation';
import StudentSearchStudents from './Student/SearchStudents/SearchStudents';
import StudentMessage from './Student/MessageComponent/MessageComponent';

class AllRoutes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/listPostings" component={CompanyHome} />
        <Route exact path="/newJobPost" component={NewJobPost} />
        <Route exact path="/AppliedStudentsInJob" component={JobAppliedStudents}/>
        <Route exact path="/listEvents" component={CompanyListEvents} />
        <Route exact path="/newEventPost" component={NewEventPost} />
        <Route exact path="/companyProfile" component={CompanyProfile} />
        <Route exact path="/editCompanyProfile" component={EditCompanyProfile} />
        <Route exact path="/RegisteredStudentsInEvent" component={EventRegisteredStudents} />
        <Route exact path="/searchStudents" component={SearchStudents} />
        <Route exact path="/companyMessages" component={CompanyMessage} />

        <Route exact path="/viewPostedJobs" component={StudentHome} />
        <Route exact path="/appliedJobs" component={AppliedJobs} />
        <Route exact path="/listEventsStudent" component={StudentListEvents} />
        <Route exact path="/registeredEvents" component={RegisteredEvents} />
        <Route exact path="/studentProfile" component={StudentProfile} />
        <Route exact path="/editStudentProfile" component={EditStudentProfile} />
        <Route exact path="/addExperienceStudentProfile" component={AddProfessionalExperienceStudent} />
        <Route exact path="/addEducationStudentProfile" component={AddEducationStudent} />
        <Route exact path="/editStudentExperience" component={EditStudentProfessionalExperience} />
        <Route exact path="/editStudentEducation" component={EditStudentEducation} />
        <Route exact path="/viewCompanyProfile/:id" component={CompanyProfile} />
        <Route exact path="/StudentProfile/:id" component={StudentProfile} />
        <Route exact path="/studentSearchStudents" component={StudentSearchStudents} />
        <Route exact path="/studentMessages" component={StudentMessage} />
      </div>
    );
  }
}

export default AllRoutes;