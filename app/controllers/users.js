let express = require('express');
let router = express.Router();
let passport = require('passport');
let User = require('../models/User');

router.route('/')

  .get(function(req, res, next) { // return all users (admin)

    User.find({}, function(err, users) {
      if (err) next(err);
      let statusCode = users.length ? 200 : 404;
      return res.status(statusCode).json({
        results: users,
        count: users.length,
        status: users.length ? "OK" : "No results found",
        statusCode: statusCode
      });
    });
  })

  .post(function(req, res, next) { // add a new user (admin)
    // @todo modify this to allow admin to add an array of users at once

    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    var password2 = req.body.password2;
    var firstName = req.body.firstName || "";
    var lastName = req.body.lastName || "";
    var email = req.body.email || "";

    // @todo do validation checks on user input

    if (password !== password2) {
      return res.status(400).json({message: "Passwords do not match"});
    }

    User.register(new User({
      username: username,
      firstname: firstName,
      lastname: lastName,
      email: email
    }),
    password,
    function(err, user) {
      if (err) { return res.status(500).json({err: err}); }
      passport.authenticate('local')(req, res, function() {
        // @todo automatically log user in when registering?
        return res.status(200).json({status: 'Registration Successful'});
      });
    });
  })

  .delete(function(req, res, next) { // delete all users (admin)

    User.remove({}, function(err, results) {
      if (err) next(err);
      return res.status(200).json({results: results, status: "Deleted all users", statusCode: 200});
    });
  })
; // end route('/')

router.route('/:username')

  .get(function(req, res, next) { // return a user
    let username = req.params.username.toLowerCase();

    User.find({username: username}, function(err, users) {
      if (err) next(err);
      let statusCode = users.length ? 200 : 404;
      return res.status(statusCode).json({
        results: users,
        count: users.length,
        status: users.length ? "OK" : "No results found",
        statusCode: statusCode
      });
    });
  })

  .put(function(req, res, next) { // update a user (admin)
    let username = req.params.username.toLowerCase();

    let doc = {};
    if ("firstname" in req.body) doc.firstname = req.body.firstname;
    if ("lastname" in req.body) doc.lastname = req.body.lastname;
    if ("email" in req.body) doc.email = req.body.email;

    // @todo allow user to change password
    // @todo validate user info

    User.update({username: username}, doc, {runValidators: true}, function(err, raw) {
      if (err) next(err);
      let statusCode = raw.nModified ? 200 : 304;
      return res.status(statusCode).json({
        results: raw,
        status: raw.nModified ? "OK" : "Not modified",
        statusCode: statusCode
      });
    });
  })

  .delete(function(req, res, next) { // delete a user (admin)
    let username = req.params.username.toLowerCase();

    User.remove({username: username}, function(err, results) {
      if (err) next(err);
      return res.status(200).json({results: results, status: "Deleted user " + username, statusCode: 200});
    });
  })
; // end route('/:username')

module.exports = router;
