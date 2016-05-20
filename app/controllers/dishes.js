var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dish = require('../models/Dish');
var Verify = require('../lib/verify');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/')

.get(function(req, res, next) {
  // return a list of all dishes
})

.post(function(req, res, next) {
  // if admin: create a new dish
  // else 401
})

.delete(function(req, res, next) {
  // if admin: delete all dishes
  // else 401
})

; // end route('/')

router.route('/:dishID')

.get(function(req, res, next) {
  // get dish with id :dishID
})

.put(function(req, res, next) {
  // if admin: update dish with id :dishID
  // else 401
})

.delete(function(req, res, next) {
  // if admin: delete dish with id :dishID
  // else 401
})

; // end route('/:dishID')

router.route('/:dishID/comments')

.get(function(req, res, next) {
  // get list of all comments for dish with id :dishID
})

.post(function(req, res, next) {
  // if logged in: add new comment to dish with id :dishID
  // else 401
})

.delete(function(req, res, next) {
  // if admin: delete all comments for dish :dishID
  // else 401
})

; // end route(':dishID/comments')

router.route(':dishID/comments/:commentID')

.get(function(req, res, next) {
  // return comment :commentID for dish :dishID
})

.put(function(req, res, next) {
  // if admin: update comment :commentID for dish :dishID
})

.delete(function(req, res, next) {
  // if admin or comment owner: delete comment :commentID for dish :dishID
})

; // end route(':dishID/comments/:commentID')
