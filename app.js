var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./config/config');
var index = require('./app/controllers/index');
var users = require('./app/controllers/users');
var leaders = require('./app/controllers/leaders');
var dishes = require('./app/controllers/dishes');
var promotions = require('./app/controllers/promotions');
var User = require('./app/models/User');
var LocalStrategy = require('passport-local').Strategy;
var authenticate = require('./config/authenticate');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// database setup
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { // we're connected!
  console.log("Connected correctly to server");
});

// passport setup
app.use(passport.initialize());

// controllers
app.use('/', index);
app.use('/users', users);
app.use('/leaders', leaders);
app.use('/dishes', dishes);
app.use('/promotions', promotions);

// Secure traffic only
// app.all('*', function(req, res, next) {
//   if (req.secure) {
//     return next();
//   }
//   res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
