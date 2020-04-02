const kafka = require('../kafka/client');

const signup = (req, res) => {
  console.log('Inside signup module:');
  console.log(req.body);

  kafka.make_request('signup', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      // console.log('Received response from kafka-backend for signup make_request');
      // console.log(results);
      res.send(results);
    }
  });
}

exports.signup = signup;