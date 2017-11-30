var express = require('express');
var router = express.Router();
const env = require('env2')('.\env');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.MOOD_BACKEND_SECRET, userProperty: 'payload'});
var mongoose = require('mongoose');
var Mood = mongoose.model('Mood');


router.get('/API/moodsbyusername', function(req, res, next) {
  let username = req.get("username")
    Mood.find({"user.username": username}, function(err,moods){
      if (err) { return next(err); }
      res.json(moods);
    });
});

module.exports = router;
