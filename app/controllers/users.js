const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Verify = require('../lib/verify');
const crud = require('../lib/crud');

router.route('/')

  .all(Verify.user, Verify.admin)

  .get((req, res, next) => { // return all users (admin)

    crud.get(User, {})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })

  .post((req, res, next) => { // add a new user (admin)
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

  .delete((req, res, next) => { // delete all users (admin)

    crud.remove(User, {})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })
; // end route('/')

router.route('/:username')

  .all(Verify.user, Verify.admin)

  .get((req, res, next) => { // return a user
    let username = req.params.username.toLowerCase();

    crud.get(User, {username: username})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })

  .put((req, res, next) => { // update a user (admin)
    let username = req.params.username.toLowerCase();

    let doc = {};
    if ("firstname" in req.body) doc.firstname = req.body.firstname;
    if ("lastname" in req.body) doc.lastname = req.body.lastname;
    if ("email" in req.body) doc.email = req.body.email;

    // @todo allow user to change password
    // @todo validate user info

    crud.update(User, {username: username}, doc)

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })

  .delete((req, res, next) => { // delete a user (admin)
    let username = req.params.username.toLowerCase();

    crud.removeOne(User, {username: username})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })
; // end route('/:username')

module.exports = router;
