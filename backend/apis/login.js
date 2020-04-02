const { auth } = require('../passport');
const kafka = require('../kafka/client');
auth();

const login = (req, res) => {
  console.log('Inside login module:');
  console.log(req.body);
  kafka.make_request('login', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      // console.log('Received response from kafka-backend for login make_request');
      // console.log(results);
      res.status(results.status).send(results.message);
    }
  });
}

exports.login = login;