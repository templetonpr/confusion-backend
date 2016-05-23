var express = require('express');
var router = express.Router();

router.route('/')

  .get(function(req, res, next) { // return all leaders
    res.render('index', { title: 'GET /leaders/' });
  })

  .post(function(req, res, next) { // add a new leader (admin)
    res.render('index', { title: 'POST /leaders/' });
  })

  .delete(function(req, res, next) { // delete all leaders (admin)
    res.render('index', { title: 'DELETE /leaders/' });
  })
; // end route('/')

router.route('/:leaderID')

  .get(function(req, res, next) { // return a leader
    var leader = req.params.leaderID;
    res.render('index', { title: 'GET /leaders/ ' + leader });
  })

  .put(function(req, res, next) { // update a leader (admin)
    var leader = req.params.leaderID;
    res.render('index', { title: 'PUT /leaders/ ' + leader });
  })

  .delete(function(req, res, next) { // delete a leader (admin)
    var leader = req.params.leaderID;
    res.render('index', { title: 'DELETE /leaders/ ' + leader });
  })
; // end route('/:leaderID')


module.exports = router;
