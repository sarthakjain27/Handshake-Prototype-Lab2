import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectNav: '',
    };
    console.log(props);
    this.showStudents = this.showStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  showStudents(e) {
    e.preventDefault();
    this.setState({
      redirectNav: <Redirect to={{ pathname: '/AppliedStudentsInJob', state: { students: this.props.post.registeredStudents, jobId: this.props.post._id } }} />,
    });
  }

  capitalize(word) {
    if (word) {
      word = word.split(' ').map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.substring(1)).join(' ');
      return word;
    }
    return '';
  }

  render() {
    return (
      <div>
        {this.state.redirectNav}
        <br />
        <Card border="primary" className="text-center">
          <Card.Body>
            <Card.Title>
              {this.capitalize(this.props.post.title)}
              {' '}
              |
              {this.capitalize(this.props.post.category)}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Job Location: </b>
              {' '}
              <i>
                {this.capitalize(this.props.post.city)}
                {', '}
                {this.capitalize(this.props.post.state)}
                {', '}
                {this.capitalize(this.props.post.country)}
                {' '}
              </i>
            </Card.Subtitle>
            <Card.Text>
              {this.props.post.description}
            </Card.Text>
            <Button variant="primary" onClick={this.showStudents}>See Students</Button>
          </Card.Body>
          <Card.Footer>
            <b>Posting Date: </b>
            {' '}
            <i>{this.props.post.postingDate}</i>
            {' '}
            {' '}
            <b>Deadline: </b>
            {' '}
            <i>{this.props.post.deadlineDate}</i>
          </Card.Footer>
        </Card>
        <br />
      </div>
    );
  }
}

export default Post;
