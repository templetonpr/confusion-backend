var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.route('/register')

  .get(function(req, res, next) { // return registration form
    res.render('index', { title: 'Registration form' });
  })

  .post(function(req, res, next) { // register a user (admin)
    res.render('index', { title: 'Got registration' });
  })
; // end route('/register')

router.route('/login')

  .get(function(req, res, next) { // return login form
    res.render('index', { title: 'Login Form' });
  })

  .post(function(req, res, next) { // login a user (admin)
    res.render('index', { title: 'Got login' });
  })
; // end route('/login')

router.route('/logout')

  .get(function(req, res, next) { // return logout form
    res.render('index', { title: 'logout' });
  })
; // end route('/logout')

router.route('/favorites')

  .get(function(req, res, next) { // return all favorites for user
    res.render('index', { title: 'GET /favorites/' });
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
