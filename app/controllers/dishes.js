var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

router.route('/')

  .get(function(req, res, next) { // return all dishes
    res.render('index', { title: 'GET /dishes/' });
  })

  .post(function(req, res, next) { // add a new dish (admin)
    res.render('index', { title: 'POST /dishes/' });
  })

  .delete(function(req, res, next) { // delete all dishes (admin)
    res.render('index', { title: 'DELETE /dishes/' });
  })
; // end route('/')

router.route('/:dish')

  .get(function(req, res, next) { // return a dish
    var dish = req.params.dish;
    res.render('index', { title: 'GET /dishes/:dish ' + dish });
  })

  .put(function(req, res, next) { // update a dish (admin)
    var dish = req.params.dish;
    res.render('index', { title: 'PUT /dishes/:dish ' + dish });
  })

  .delete(function(req, res, next) { // delete a dish (admin)
    var dish = req.params.dish;
    res.render('index', { title: 'DELETE /dishes/:dish ' + dish });
  })
; // end route('/:dish')

router.route('/:dish/comments')

  .get(function(req, res, next) { // return comments for a dish
    var dish = req.params.dish;
    res.render('index', { title: 'GET /dishes/ ' + dish + ' /comments' });
  })

  .post(function(req, res, next) { // add a comment to dish
    var dish = req.params.dish;
    res.render('index', { title: 'POST /dishes/ ' + dish + ' /comments' });
  })

  .delete(function(req, res, next) { // delete comments for a dish (admin)
    var dish = req.params.dish;
    res.render('index', { title: 'DELETE /dishes/ ' + dish + ' /comments' });
  })
; // end route('/:dish/comments')

router.route('/:dish/comments/:commentID')

  .get(function(req, res, next) { // return a comment for a dish
    var dish = req.params.dish;
    var comment = req.params.commentID;
    res.render('index', { title: 'GET /dishes/ ' + dish + ' /comments/ ' + comment });
  })

  .put(function(req, res, next) { // edit a comment of a dish (admin)
    var dish = req.params.dish;
    var comment = req.params.commentID;
    res.render('index', { title: 'PUT /dishes/ ' + dish + ' /comments/ ' + comment });
  })

  .delete(function(req, res, next) { // delete comment for a dish (admin or author)
    var dish = req.params.dish;
    var comment = req.params.commentID;
    res.render('index', { title: 'DELETE /dishes/ ' + dish + ' /comments/ ' + comment });
  })
; // end route('/:dish/comments/:commentID')

module.exports = router;
