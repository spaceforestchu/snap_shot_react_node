var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

/* GET users listing. */
router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({confirmation: 'fail', resource: 'Invalid Resource'});
    return;
  }

  controller.get(req.query, false).then(function(results) {
    res.json({confirmation: 'success', results: results});
    return;
  }).catch(function(err) {
    res.json({confirmation: 'fail', message: err});
    return;
  });

});

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({confirmation: 'fail', message: 'Invalid Resource'});
    return;
  }

  var id = req.params.id;

  controller.getById(id, false)
    .then(function(result){
      res.json({confirmation: 'success', result: result});
      return;
    })
    .catch(function(err){
      res.json({confirmation: 'fail', message: 'Not Found'});
      return;
    });

});

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({confirmation: 'fail', message: 'Invalid Resource'});
    return;
  }

  controller.post(req.body, false)
    .then(function(result){
      res.json({confirmation: 'success', result: result});
      return;
    })
    .catch(function(err){
      res.json({confirmation: 'fail', message: err});
      return;
    });

});


module.exports = router;
