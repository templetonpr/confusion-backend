var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'confusion-backend'
    },
    port: process.env.PORT || 3000,
    db: process.env.DB_URL || 'mongodb://localhost/confusion-backend-development',
    secretKey: '12345-67890-09876-54321',
    facebook: {
      clientID: 'YOUR FACEBOOK APP ID',
      clientSecret: 'YOUR FACEBOOK SECRET',
      callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'confusion-backend'
    },
    port: process.env.PORT || 3000,
    db: process.env.DB_URL || 'mongodb://localhost/confusion-backend-test',
    secretKey: '12345-67890-09876-54321',
    facebook: {
      clientID: 'YOUR FACEBOOK APP ID',
      clientSecret: 'YOUR FACEBOOK SECRET',
      callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'confusion-backend'
    },
    port: process.env.PORT || 3000,
    db: process.env.DB_URL || 'mongodb://localhost/confusion-backend-production',
    secretKey: '12345-67890-09876-54321',
    facebook: {
      clientID: 'YOUR FACEBOOK APP ID',
      clientSecret: 'YOUR FACEBOOK SECRET',
      callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
  }
};

module.exports = config[env];
