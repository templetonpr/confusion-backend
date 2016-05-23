var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

router.route('/')

  .get(function(req, res, next) { // return all promotions
    res.render('index', { title: 'GET /promotions/' });
  })

  .post(function(req, res, next) { // add a new promotion (admin)
    res.render('index', { title: 'POST /promotions/' });
  })

  .delete(function(req, res, next) { // delete all promotions (admin)
    res.render('index', { title: 'DELETE /promotions/' });
  })
; // end route('/')

router.route('/:promoID')

  .get(function(req, res, next) { // return a promotion
    var promotion = req.params.promoID;
    res.render('index', { title: 'GET /promotions/ ' + promotion });
  })

  .put(function(req, res, next) { // update a promotion (admin)
    var promotion = req.params.promoID;
    res.render('index', { title: 'PUT /promotions/ ' + promotion });
  })

  .delete(function(req, res, next) { // delete a promotion (admin)
    var promotion = req.params.promoID;
    res.render('index', { title: 'DELETE /promotions/ ' + promotion });
  })
; // end route('/:promoID')

module.exports = router;
