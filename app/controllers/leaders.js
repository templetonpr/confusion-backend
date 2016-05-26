var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Leader = require('../models/Leader');
var crud = require('../lib/crud');

router.route('/')

  .get(function(req, res, next) { // return all leaders

    crud.get(Leader, {})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
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
    // @todo redo this to have more helpful invalid field info

    let invalidFields = [];
    for (let field in doc) {
      if (field === null) invalidFields.push(field);
    }

    if (invalidFields.length > 0) {
      var response = {results: invalidFields, status: "Some fields were invalid", statusCode: 400};
      return res.status(response.statusCode).json(response);

    } else { // all fields are valid
      crud.getNone(Leader, {name: doc.name})

      .then(() => {
        return crud.insert(Leader, doc);
      })

      .then((results) => {
        let statusCode = results.statusCode;
        console.log(results);
        return res.status(statusCode).json(results);
      })

      .catch((err) => {
        if (typeof err === 'DbResultError') { // error is from crud
          next(err);
        } else {
          next(err);
        }
      });
    }
  })

  .delete(function(req, res, next) { // delete all leaders (admin)

    crud.remove(Leader, {})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })
; // end route('/')

router.route('/:leader')

  .get(function(req, res, next) { // return a leader
    var leader = req.params.leader;

    crud.get(Leader, {name: leader})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
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

    crud.update(Leader, {name: leader}, doc)

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })

  .delete(function(req, res, next) { // delete a leader (admin)
    var leader = req.params.leader;

    crud.removeOne(Leader, {name: leader})

    .then((results) => {
      let statusCode = results.statusCode;
      return res.status(statusCode).json(results);
    })

    .catch((err) => {
      if (typeof err === 'DbResultError') { // error is from crud
        next(err);
      } else {
        next(err);
      }
    });
  })
; // end route('/:leaderID')


module.exports = router;
