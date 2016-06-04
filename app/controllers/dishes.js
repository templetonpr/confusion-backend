const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Dish = require('../models/Dish');
const Verify = require('../lib/verify');
const crud = require('../lib/crud');

router.route('/')

  .get((req, res, next) => { // return all dishes

    crud.get(Dish, {})

    .then((results) => {
      return res.status(results.statusCode).json(results);
    })

    .catch( (err) => { next(err); } );
  })

  .post(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // parse body for dish info
      let doc = {};
      doc.name = req.body.name || null;
      doc.image = req.body.image || null;
      doc.category = req.body.category || null;
      doc.price = req.body.price || null;
      doc.description = req.body.description || null;
      if (req.body.label) doc.label = req.body.label; // this one is optional

      // @todo validate info
      // @todo add support for image upload
      // @todo redo this to have more helpful invalid field info

      let invalidFields = [];

      for (let field in doc) {
        if (doc[field] === null) {
          invalidFields.push(field);
        }
      }

      if (invalidFields.length > 0) {
        let response = {invalidFields: invalidFields, status: "Some fields were invalid", statusCode: 400};
        return res.status(response.statusCode).json(response);

      } else {
        req.doc = doc;
        next();
      }
    }, (req, res, next) => { // add a new dish (admin)
      crud.getNone(Dish, {name: req.doc.name}) // make sure dish doesn't already exist

      .then(() => { // insert new dish into Dish collection
        return crud.insert(Dish, doc);
      })

      .then((results) => { // respond to request
        return res.status(results.statusCode).json(results);
      })

      .catch((err) => { // handle errors
        if (typeof err === 'DbResultError' && err.resultCount > 0) { // dish already exists
          let err = new Error("A dish with that name already exists");
          err.status = 400;
        } else {
          next(err);
        }
      });
  })

  .delete(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // delete all dishes (admin)

    crud.remove(Dish, {})

    .then((results) => { // respond to request
      return res.status(results.statusCode).json(results);
    })

    .catch((err) => { // handle errors
      next(err);
    });
  })
; // end route('/')

router.route('/:dishName')

  .all(findDish)

  // return a dish
  .get((req, res, next) => { return res.status(200).json(req.dish); })

  // update a dish (admin)
  .put(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // parse request for new dish info
      let newDishInfo = {};
      if ("image" in req.body) newDishInfo.image = req.body.image;
      if ("category" in req.body) newDishInfo.category = req.body.category;
      if ("label" in req.body) newDishInfo.label = req.body.label;
      if ("price" in req.body) newDishInfo.price = req.body.price;
      if ("description" in req.body) newDishInfo.description = req.body.description;

      // @todo validate info

      if (newDishInfo == {}) {
        let err = new Error("You didn't include anything to update");
        err.status = 400;
        next(err);
      } else {
        req.newDishInfo = newDishInfo;
        next();
      }
    }, (req, res, next) => { // update dish
      let dish = req.dish;

      crud.update(Dish, {_id: req.dish._id}, req.newDishInfo)

      .then((results) => {
        return res.status(results.statusCode).json(results);
      })

      .catch( (err) => { next(err); } );
  })

  .delete(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // delete a dish (admin)
      crud.remove(Dish, {_id: req.dish._id})

        .then((results) => {
          return res.status(results.statusCode).json(results);
        })

        .catch( (err) => { next(err); } );
  })
; // end route('/:dish')

router.route('/:dishName/comments')

  .all(findDish)

  .get((req, res, next) => { // return comments for a dish
    let comments = req.dish.comments;
    if (comments.length == 0) {
      return res.status(404).json({results: [], count: 0, status: "No comments found", statusCode: 404});
    } else {
      return res.status(200).json({results: comments, count: comments.length, status: "OK", statusCode: 200});
    }
  })

  .post(
    Verify.user,
    (req, res, next) => { // add a comment to dish
    let comment = {
      rating: req.body.rating,
      comment: req.body.comment,
      author: req.body.author
    };

    // @todo author should get the logged in user's username
    // @todo validate inputs

    req.dish.comments.push(comment);

    crud.update(Dish, {_id: req.dish._id}, req.dish)

    .then((results) => {
      return res.status(results.statusCode).json(results);
    })

    .catch((err) => { next(err) });
    })

  .delete(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // delete comments for a dish (admin)

    req.dish.comments = [];

    crud.update(Dish, {_id: req.dish._id}, req.dish)

    .then((results) => {
      return res.status(results.statusCode).json(results);
    })

    .catch((err) => { next(err) });
  })
; // end route('/:dish/comments')

router.route('/:dishName/comments/:commentID')

  .all(findDish, findComment)

  // return a comment for a dish
  .get((req, res, next) => { return res.status(200).json(req.comment); })

  // edit a comment of a dish (admin or author)
  .put(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // parse body for comment info
      let comment = {};
      if (req.body.rating) comment.rating = req.body.rating;
      if (req.body.comment) comment.comment = req.body.comment;

      // @todo validate inputs

      if (comment == {}) {
        let err = new Err("New comment data not found");
        err.status = 400;
        next(err);
      } else {
        req.comment.rating = comment.rating;
        req.comment.comment = comment.comment;
        next();
      }
    }, (req, res, next) => { // update comment
      for (let i = 0; i < req.dish.comments.length; i++) {
        if (req.dish.comments[i]._id == req.comment._id) {
          req.dish.comments.splice(i, 1, req.comment); // swap old comment with new one in req.dish
          break;
        }
      }
      crud.update(Dish, {_id: req.dish._id}, req.dish)

      .then((results) => { return res.status(results.statusCode).json(results); })

      .catch((err) => { next(err) });
  })

  .delete(
    Verify.user,
    Verify.admin,
    (req, res, next) => { // delete comment for a dish (admin or author)
      for (let i = 0; i < req.dish.comments.length; i++) {
        if (req.dish.comments[i]._id == req.comment._id) {
          console.log("found comment to delete at index " + i);
          req.dish.comments.splice(i, 1); // remove comment from req.dish
          break;
        }
      }
      crud.update(Dish, {_id: req.dish._id}, req.dish)

      .then((results) => { return res.status(results.statusCode).json(results); })

      .catch((err) => { next(err) });
    })
; // end route('/:dish/comments/:commentID')



module.exports = router;

function findDish(req, res, next) {
  // find dish, if it exists, and set it to req.dish
  let dishName = req.params.dishName;

  crud.getOne(Dish, {name: dishName})

  .then((results) => {
    req.dish = results.results[0];
    next();
  })

  .catch((err) => {
    if (typeof err === 'DbResultError' && err.resultCount == 0) { // no dishes were found
      let response = {err: "Dish not found", statusCode: 404};
      return res.status(response.status).json(response);

    } else if (typeof err === 'DbResultError' && err.resultCount > 0) { // no dishes were found
      let response = {err: "Multiple dishes found", statusCode: 400};
      return res.status(response.status).json(response);

    } else {
      next(err);
    }
  });
}

function findComment(req, res, next) {
  let dish = req.dish || null;
  let commentID = req.params.commentID;

  if (dish == null) { // dish wasn't saved to req for some reason
    let err = new Error("There was a problem finding the dish");
    err.status = 500;
    next(err);

  } else {

    let comment;

    for (let i = 0; i < dish.comments.length; i++) {
      if (dish.comments[i]._id == commentID) {
        comment = dish.comments[i];
      }
    }

    if (!comment) { // comment wasn't found
      let err = new Error("That comment wasn't found for that dish");
      err.status = 404;
      next(err);

    } else { // comment was found
      req.comment = comment;
      next();
    }
  }
}
