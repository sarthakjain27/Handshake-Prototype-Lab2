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

// Student Components import
import StudentHome from './Student/Home/StudentHome';

class AllRoutes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/listPostings" component={CompanyHome} />
        <Route exact path="/newJobPost" component={NewJobPost} />
        <Route exact path="/AppliedStudentsInJob" component={JobAppliedStudents}/>


        <Route exact path="/viewPostedJobs" component={StudentHome} />

      </div>
    );
  }
}

export default AllRoutes;