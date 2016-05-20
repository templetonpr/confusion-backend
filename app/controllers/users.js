var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');
var Verify = require('../lib/verify');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/')
  .get(Verify.admin, function(req, res, next) {
    // if admin: return list of all users
  })
; // end route('/')

router.route('/:userID')
  .get(Verify.user, function(req, res, next) {
    // if user matching ID: return user info
  })

  .put(Verify.user, function(req, res, next) {
    // if user matching ID: update user info
  })

  .delete(Verify.user, function(req, res, next) {
    // if user matching id: delete user account
  })
; // end route('/:userID')

router.route('/:userID/favorites')
  .get(Verify.user, function(req, res, next) {
    // if logged in user: return list of user's favorite dishes
  })

  .post(Verify.user, function(req, res, next) {
    // if logged in user: add dish to user's favorites
  })

  .delete(Verify.user, function(req, res, next) {
    // if logged in user: delete all favorite dishes
  })
; // end route('/favorites')

router.route('/:userID/favorites/:dishID')

.delete(Verify.user, function (req, res, next) {
  // if logged in user: delete :dishID from list of favorites
});
; // end route('/:userID/favorites/:dishID')

// User creation

router.post('/register', function (req, res, next) {
  // create new user account
});

router.post('/login', function (req, res, next) {
  // login
});

router.get('/logout', function (req, res, next) {
  // log out
  req.logout();
  req.session = null;
  res.redirect('/');
});

// Facebook Oauth
// router.get('/facebook', function (req, res, next) {});
// router.get('/facebook/callback', function (req, res, next) {});
