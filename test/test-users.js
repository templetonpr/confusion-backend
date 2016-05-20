var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require(__dirname + '/../app.js');

var expect = chai.expect;
chai.use(chaiHttp);

describe('users', function() {

  // GET /users/
  it('should respond to GET /users/ with 401 if !admin');
  it('should respond to GET /users/ with 200 if admin');
  it('should respond to GET /users/ with a list of all users if admin');

  // GET /users/:userID
  it('should respond to GET /users/:userID with 401 if not logged in as correct user');
  it('should respond to GET /users/:userID with 200 if logged in as correct user');
  it('should respond to GET /users/:userID with info about user');
  it('should respond to GET /users/:userID with info about correct user');

  // PUT /users/:userID
  it('should respond to PUT /users/:userID with 401 if not logged in as correct user');
  it('should update /users/:userID with new info');
  it('should update info about correct user');
  it('should correctly handle invalid data');

  // DELETE /users/:userID
  it('should respond to PUT /users/:userID with 401 if not logged in as correct user or admin');
  it('should delete /users/:userID');
  it('should delete correct user');

  // GET /users/:userID/favorites
  it('should return 401 if not logged in as correct user');
  it('should return 200 if logged in as correct user');
  it('should return user\'s favorites');
  it('should return correct user\'s favorites');

  //  POST /users/:userID/favorites
  it('should return 401 if not logged in as correct user');
  it('should add dish to user\'s favorites');
  it('should add dish to correct user\'s favorites');
  it('should correctly handle invalid data');

  // DELETE /users/:userID/favorites
  it('should return 401 if not logged in as correct user');
  it('should delete user\'s favorites');
  it('should delete correct user\'s favorites');

  // DELETE /users/:userID/favorites/:dishID
  it('should return 401 if not logged in as correct user');
  it('should delete dish from user\'s favorites');
  it('should delete dish from correct user\'s favorites');
  it('should delete correct dish from user\'s favorites');

  // POST /users/register
  it('should register a new user');
  it('should correctly handle invalid data');

  // POST /users/login
  it('should log in user');
  it('should correctly handle invalid data');

  // GET /logout
  it('should log out user');
  it('should log out correct user');
  it('should only log out user');

});
