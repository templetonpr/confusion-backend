var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Promo = require('../models/Promo');
var Verify = require('../lib/verify');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/')

.get(function(req, res, next){
  // return all promotions
})

.post(function(req, res, next){
  // if admin: add new promotion
})

.delete(function(req, res, next){
  // if admin: delete all promotions
})
; // end route('/')

router.route('/:promoID')

.get(function(req, res, next){
  // return promotion matching :promoID
})

.put(function(req, res, next){
  // if admin: edit promotion matching :promoID
})

.delete(function(req, res, next){
  // if admin: delete promotion matching :promoID
})

; // end route('/:promoID')
