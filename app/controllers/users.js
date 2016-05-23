var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

router.route('/')

  .get(function(req, res, next) { // return all users
    res.render('index', { title: 'GET /users/' });
  })

  .post(function(req, res, next) { // add a new user (admin)
    res.render('index', { title: 'POST /users/' });
  })

  .delete(function(req, res, next) { // delete all users (admin)
    res.render('index', { title: 'DELETE /users/' });
  })
; // end route('/')

router.route('/:username')

  .get(function(req, res, next) { // return a user
    var username = req.params.username;
    res.render('index', { title: 'GET /users/:username ' + username });
  })

  .put(function(req, res, next) { // update a user (admin)
    var username = req.params.username;
    res.render('index', { title: 'PUT /users/:username ' + username });
  })

  .delete(function(req, res, next) { // delete a user (admin)
    var username = req.params.username;
    res.render('index', { title: 'DELETE /users/:username ' + username });
  })
; // end route('/:username')

module.exports = router;
