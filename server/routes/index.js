var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let jwt = require('express-jwt');

let auth = jwt({secret: process.env.MOOD_BACKEND_SECRET, userProperty: 'payload'});

module.exports = router;
