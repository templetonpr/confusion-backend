var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Verify = require('../lib/verify');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.route('/register')

  .post(function(req, res, next) { // register a user

    var username = req.body.username;
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
; // end route('/register')

router.route('/login')

  .post(function(req, res, next) { // login a user

    var username = req.body.username;
    var password = req.body.password;

    // @todo validation checks on user input

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({err: info}); }
      req.logIn(user, function(err) {
        if (err) { return res.status(500).json({err: 'Could not log in user'}); }
        var token = Verify.getToken(user);
        // set x-access-token cookie?
        return res.status(200).json({status: 'Login successful', success: true, token: token});
      });
    })(req, res, next);
  })
; // end route('/login')

router.route('/logout')

  .get(function(req, res, next) { // return logout form
    req.logout();
    req.session = null;
    // clear x-access-token cookie?
    res.status(200).json({status: 'Bye!'});
  })
; // end route('/logout')

router.route('/favorites')

  .get(Verify.user, function(req, res, next) { // return all favorites for user
    return res.status(200).json({favorites: "List of favorites"});
  })

  .post(function(req, res, next) { // add a new favorite
    res.render('index', { title: 'POST /favorites/' });
  })

  .delete(function(req, res, next) { // delete all favorites
    res.render('index', { title: 'DELETE /favorites/' });
  })
; // end route('/favorites')

router.route('/favorites/:favID')

  .delete(function(req, res, next) {
    var favID = req.params.favID
    res.render('index', { title: 'DELETE /favorites/ ' + favID });
  })
; // end route('/favorites/:favID')

module.exports = router;
