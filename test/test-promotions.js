var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require(__dirname + '/../app.js');

var expect = chai.expect;
chai.use(chaiHttp);

describe('promotions', function() {

  // GET /promotions/
  it('should return 200');
  it('should return list of all promotions');

  // POST /promotions/
  it('should return 401 if !admin');
  it('should add a new promotion with provided info');
  it('should correctly handle invalid data');

  // DELETE /promotions/
  it('should return 401 if not admin');
  it('should delete all promotions');

  // GET /promotions/:promoID
  it('should return 200');
  it('should return promotion info');
  it('should return correct promotion info');

  // PUT /promotions/:promoID
  it('should return 401 if !admin');
  it('should add promotion to promotions');
  it('should correctly handle invalid data');

});
