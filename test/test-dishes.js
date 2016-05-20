var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require(__dirname + '/../app.js');

var expect = chai.expect;
chai.use(chaiHttp);

describe('dishes', function() {

  // GET /dishes/
  it('should return 200');
  it('should return list of all dishes');

  // POST /dishes/
  it('should return 401 if !admin');
  it('should add a new dish with provided info');
  it('should correctly handle invalid data');

  // DELETE /dishes/
  it('should return 401 if not admin');
  it('should delete all dishes');

  // GET /dishes/:dishID
  it('should return 200');
  it('should return dish info');
  it('should return correct dish info');

  // PUT /dishes/:dishID
  it('should return 401 if !admin');
  it('should add dish to dishes');
  it('should correctly handle invalid data');

  // GET /dishes/:dishID/comments
  it('should return 200');
  it('should return comments for dish');

  // POST /dishes/:dishID/comments
  it('should return 401 if !user');
  it('should add new comment to dish');

  // DELETE /dishes/:dishID/comments
  it('should return 401 if !admin');
  it('should delete comments for dish');

  // GET /dishes/:dishID/comments/:commentID
  it('should return 200');
  it('should return comment');
  it('should return correct comment');
  it('should return comment for correct dish');

  // PUT /dishes/:dishID/comments/:commentID
  it('should return 401 if !admin');
  it('should update comment');
  it('should update correct comment');
  it('should update comment for correct dish');
  it('should correctly handle invalid data');

  // DELETE /dishes/:dishID/comments/:commentID
  it('should return 401 if !admin or comment owner');
  it('should delete comment from dish');
  it('should delete correct comment from dish');
  it('should delete comment from correct dish');

});
