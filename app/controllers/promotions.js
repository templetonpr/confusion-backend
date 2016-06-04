const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Promo = require('../models/Promo');
const Verify = require('../lib/verify')
const crud = require('../lib/crud');

router.route('/')

  .get((req, res, next) => { // return all promotions

    crud.get(Promo, {})

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

  .post(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // add a new promotion (admin)

      let doc = {};
      doc.name = req.body.name || null;
      doc.image = req.body.image || null;
      doc.category = req.body.category || null;
      doc.label = req.body.label || null;
      doc.price = req.body.price || null;
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
        crud.getNone(Promo, {name: doc.name})

        .then(() => {
          return crud.insert(Promo, doc);
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

  .delete(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // delete all promotions (admin)

      crud.remove(Promo, {})

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

router.route('/:promo')

  .get((req, res, next) => { // return a promotion
    let promotion = req.params.promo;

    crud.get(Promo, {name: promotion})

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

  .put(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // update a promotion (admin)
      let promotion = req.params.promo;

      let doc = {};
      if ("image" in req.body) doc.image = req.body.image;
      if ("category" in req.body) doc.category = req.body.category;
      if ("label" in req.body) doc.label = req.body.label;
      if ("price" in req.body) doc.price = req.body.price;
      if ("description" in req.body) doc.description = req.body.description;

      // @todo validate info

      crud.update(Promo, {name: promotion}, doc)

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

  .delete(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // delete a promotion (admin)
      let promotion = req.params.promo;

      crud.removeOne(Promo, {name: promotion})

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
; // end route('/:promo')

module.exports = router;
