const kafka = require('../kafka/client');

const listCompanyPostedEvents = (req, res) => {
  console.log('Inside listCompanyPostedEvents module:');
  console.log(req.body);
  kafka.make_request('listCompanyCreatedEvents', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
}

const createEvent = (req, res) => {
  console.log('Inside createEvent module:');
  console.log(req.body);
  kafka.make_request('createEvent', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const getSearchedEvent = (req, res) => {
  console.log('Inside getSearchedEvent');
  console.log(req.body);
  kafka.make_request('getSearchedEvent', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const registerForEvent = (req, res) => {
  console.log('Inside registerForEvent');
  console.log(req.body);
  kafka.make_request('registerForEvent', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const getRegisteredEvents = (req, res) => {
  console.log('Inside getRegisteredEvents');
  kafka.make_request('getRegisteredEvents', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
};

const getStudentsRegisteredInAEvent = (req, res) => {
  console.log('Inside getStudentsRegisteredInAEvent');
  console.log(req.body);
  kafka.make_request('getStudentsRegisteredInAEvent', req.body, function (err, results) {
    if (err) {
      res.send("Error");
    }
    else {
      res.send(results);
    }
  });
}

exports.listCompanyPostedEvents = listCompanyPostedEvents;
exports.createEvent = createEvent;
exports.getSearchedEvent = getSearchedEvent;
exports.registerForEvent = registerForEvent;
exports.getRegisteredEvents = getRegisteredEvents;
exports.getStudentsRegisteredInAEvent = getStudentsRegisteredInAEvent;