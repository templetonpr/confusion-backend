var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Leader = require('../models/Leader');

router.route('/')

  .get(function(req, res, next) { // return all leaders

    Leader.find({}, function(err, results) {
      if (err) next(err);
      let statusCode = results.length ? 200 : 404;
      return res.status(statusCode).json({
        results: results,
        count: results.length,
        status: results.length ? "OK" : "No results found",
        statusCode: statusCode
      });
    });
  })

  .post(function(req, res, next) { // add a new leader (admin)

    let doc = {};
    doc.name = req.body.name || null;
    doc.image = req.body.image || null;
    doc.designation = req.body.designation || null;
    doc.abbr = req.body.abbr || null;
    doc.description = req.body.description || null;

    // @todo validate info
    // @todo add support for image upload

    let invalidFields = [];
    for (let field in doc) {
      if (field === null) invalidFields.push(field);
    }

    if (invalidFields.length > 0) {
      var response = {results: invalidFields, status: "Some fields were invalid", statusCode: 400};
      return res.status(response.statusCode).json(response);
    }

    Leader.find({}, function(err, results) {
      if (err) next(err);
      if (results.length > 0) return res.status(400).json({results: results, status: "That leader already exists", statusCode: 400});
    });

    Leader.create(doc, function(err, results) {
      if (err) {
        next(err);
      } else {
        var statusCode = 201;
        return res.status(statusCode).json({
          results: results,
          status: "Leader created",
          statusCode: statusCode
        });
      }

    });
  })

  .delete(function(req, res, next) { // delete all leaders (admin)

    Leader.remove({}, function(err, results) {
      if (err) next(err);
      return res.status(200).json({results: results, status: "Deleted all leaders", statusCode: 200});
    });
  })
; // end route('/')

router.route('/:leader')

  .get(function(req, res, next) { // return a leader
    var leader = req.params.leader;


    Leader.find({name: leader}, function(err, results) {
      if (err) next(err);
      let statusCode = results.length ? 200 : 404;
      return res.status(statusCode).json({
        results: results,
        count: results.length,
        status: results.length ? "OK" : "No results found",
        statusCode: statusCode
      });
    });
  })

  .put(function(req, res, next) { // update a leader (admin)
    var leader = req.params.leader;

    let doc = {};
    if ("image" in req.body) doc.image = req.body.image;
    if ("designation" in req.body) doc.designation = req.body.designation;
    if ("abbr" in req.body) doc.abbr = req.body.abbr;
    if ("description" in req.body) doc.description = req.body.description;

    // @todo validate info

    Leader.update({name: leader}, doc, {runValidators: true}, function(err, raw) {
      if (err) next(err);
      let statusCode = raw.nModified ? 200 : 304;
      return res.status(statusCode).json({
        results: raw,
        status: raw.nModified ? "OK" : "Not modified",
        statusCode: statusCode
      });
    });
  })

  .delete(function(req, res, next) { // delete a leader (admin)
    var leader = req.params.leader;

    Leader.remove({name: leader}, function(err, results) {
      if (err) next(err);
      return res.status(200).json({results: results, status: "Deleted leader " + leader, statusCode: 200});
    });
  })
; // end route('/:leaderID')


module.exports = router;
