var express = require('express');
var router = express.Router();
const env = require('env2')('.\env');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.MOOD_BACKEND_SECRET, userProperty: 'payload'});
var mongoose = require('mongoose');
var Mood = mongoose.model('Mood');
var Activity = mongoose.model('Activity');
var User = mongoose.model('User');

router.get('/API/moodsbyusername', function(req, res, next) {
  let username = req.get("username")
    Mood.find({"user.username": username}, function(err,moods){
      if (err) { return next(err); }
      res.json(moods);
    });
});

router.get('/API/moodsbyyear', function(req, res, next) {
  let username = req.get("username")
  let year = req.get("year")
    Mood.find({"user.username": username}, function(err,moods){
      if (err) { return next(err); }
      res.json(moods);
    }).where("user.year").equals(year);
});

router.get('/API/moodsbymonth', function(req, res, next) {
  let username = req.get("username")
  let year = req.get("year")
  let month = req.get("month")
    Mood.find({"user.username": username}, function(err,moods){
      if (err) { return next(err); }
      res.json(moods);
    }).where("user.year").equals(year).where("user.month").equals(month);
});

router.get('/API/activitiesbyusername', function(req, res, next) {
  let username = req.get("username")
  User.findOne({"username":username}).exec(function(err, user){
    Activity.find({"user": user._id}, function(err,activities){
      if (err) { return next(err); }
      res.json(activities);
    });
  })
});

router.post('/API/addactivity', function(req,res,next){
  let activity = new Activity()
  activity.icon = req.body.a.icon
  activity.name = req.body.a.name
  User.findOne({"username":req.body.user}).exec(function(err, user){
    activity.user = user._id;
    activity.save(function(err, rec) {
      if (err){ return next(err); }
      res.json(rec);
    });
  })
});

router.post('/API/deleteactivity', function(req,res,next){
  console.log(req.body.name)
 Activity.findOneAndRemove({"name":req.body.name}).exec(function(err, rec) {
  if (err){ return next(err); }
    res.json(rec);
  })
})

module.exports = router;
