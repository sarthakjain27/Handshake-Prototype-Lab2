import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// My common components import
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

// Company Components import
import CompanyHome from './components/Company/Home/CompanyHome';
import NewJobPost from './components/Company/JobsComponent/NewJobPost';
import JobAppliedStudents from './components/Company/Home/JobAppliedStudents';

// Student Components import
import StudentHome from './components/Student/Home/StudentHome';



class AllRoutesCombined extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/listPostings" component={CompanyHome} />
        <Route exact path="/newJobPost" component={NewJobPost} />
        <Route exact path="/AppliedStudentsInJob" component={JobAppliedStudents}/>


        <Route exact path="/viewPostedJobs" component={StudentHome} />

      </Router>
    );
  }
}

ReactDOM.render(<AllRoutesCombined />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
