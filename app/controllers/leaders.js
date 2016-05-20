var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Leader = require('../models/Leader');
var Verify = require('../lib/verify');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/')

.get(function(req, res, next){
  // return all leaders
})

.post(function(req, res, next){
  // if admin: add new leader
  // else error 401
})

.delete(function(req, res, next){
  // if admin: delete all leaders
  // else eror 401
})
; // end route('/')

router.route('/:leaderID')

.get(function(req, res, next){
  // return leader matching :leaderID
})

.put(function(req, res, next){
  // if admin: edit leader matching :leaderID
  // else error 401
})

.delete(function(req, res, next){
  // if admin: delete leader matching :leaderID
  // else eror 401
})

; // end route('/:leaderID')
