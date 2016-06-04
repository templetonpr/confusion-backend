var User = require('../models/User');
var jwt = require('jsonwebtoken'); // Create, sign, verify tokens
var config = require('../../config/config');
var crud = require('../lib/crud');

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.user = function(req, res, next) { // verify ordinary user
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) { // decode token
    jwt.verify(token, config.secretKey, function(err, decoded) {

      if (err) { // jwt says token isn't valid
        var err = new Error('You are not authenticated');
        err.status = 401;
        return next(err);

      } else { // token looks good, save it to request for future usage in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else { // there is no token, return an error
    var err = new Error('No token provided');
    err.status = 403;
    return next(err);
  }
};

exports.admin = function(req, res, next) {
  // verify admin user
  if (req.decoded && req.decoded._doc.admin) {
    req.isAdmin = true;
    next();
  } else {
    var err = new Error('Not authorized');
    err.status = 403;
    next(err);
  }
}
