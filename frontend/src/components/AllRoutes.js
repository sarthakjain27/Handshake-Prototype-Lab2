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

// Student Components import
import StudentHome from './Student/Home/StudentHome';
import AppliedJobs from './Student/JobsComponent/AppliedJobs';
import StudentListEvents from './Student/EventsComponent/ListEvents';
import RegisteredEvents from './Student/EventsComponent/RegisteredEvents';

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

        <Route exact path="/viewPostedJobs" component={StudentHome} />
        <Route exact path="/appliedJobs" component={AppliedJobs} />
        <Route exact path="/listEventsStudent" component={StudentListEvents} />
        <Route exact path="/registeredEvents" component={RegisteredEvents} />
      </div>
    );
  }
}

export default AllRoutes;