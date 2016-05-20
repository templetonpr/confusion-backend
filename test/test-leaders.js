var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require(__dirname + '/../app.js');

var expect = chai.expect;
chai.use(chaiHttp);

describe('leaders', function() {

  // GET /leaders/
  it('should return 200');
  it('should return list of all leaders');

  // POST /leaders/
  it('should return 401 if !admin');
  it('should add a new leader with provided info');
  it('should correctly handle invalid data');

  // DELETE /leaders/
  it('should return 401 if not admin');
  it('should delete all leaders');

  // GET /leaders/:leaderID
  it('should return 200');
  it('should return leader info');
  it('should return correct leader info');

  // PUT /leaders/:leaderID
  it('should return 401 if !admin');
  it('should add leader to leaders');
  it('should correctly handle invalid data');

});
