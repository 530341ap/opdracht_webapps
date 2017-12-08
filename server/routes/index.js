var express = require('express');
var router = express.Router();
const env = require('env2')('.\env');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.MOOD_BACKEND_SECRET, userProperty: 'payload'});
var mongoose = require('mongoose');
var Mood = mongoose.model('Mood');
var Activity = mongoose.model('Activity');
var MoodCategory = mongoose.model('MoodCategory');
var User = mongoose.model('User');

router.get('/API/moodsbyusername', function(req, res, next) {
  let username = req.get("username")
  User.findOne({"username":username}).exec(function(err, user){
    Mood.find({"user": user._id}).populate('moodCategory').populate('activities').exec(function(err,moods){
      if (err) { return next(err); }
      res.json(moods);
    })
  })
});

router.get('/API/moodbyid', function(req, res, next) {
  let username = req.get("username")
  let id = req.get("id")
  User.findOne({"username":username}).exec(function(err, user){
    Mood.findOne({"user": user._id, "_id": id}).populate('moodCategory').populate('activities').exec(function(err,moods){
      if (err) { return next(err); }
      res.json(moods);
    })
  })
});

router.post('/API/addmood', function(req,res,next){
  let mood = new Mood()
  mood.date = req.body.m.date
  User.findOne({"username":req.body.user}).exec(function(err, user){
    let names = req.body.m.activities.map(a => a.name)
    Activity.find({name: {$in: names}}).exec(function(err, activities){
      MoodCategory.findOne({"name": req.body.m.category.name}).exec(function(err, category){
        mood.user = user._id;
        mood.activities = activities;
        console.log(activities)
        mood.moodCategory = category;
        mood.save(function(err, rec) {
          if (err){ return next(err); }
          res.json(rec);
        })
      })
    });
  })
});

router.put('/API/editmood', function(req,res,next){
  Mood.findOne({"_id":req.body.m.id}).exec(function(err,mood){
  mood.date = req.body.m.date
  User.findOne({"username":req.body.user}).exec(function(err, user){
    let names = req.body.m.activities.map(a => a.name)
    Activity.find({name: {$in: names}}).exec(function(err, activities){
      MoodCategory.findOne({"name": req.body.m.category.name}).exec(function(err, category){
        mood.user = user._id;
        mood.activities = activities;
        mood.moodCategory = category;
        mood.save(function(err, rec) {
          if (err){ return next(err); }
          res.json(rec);
        })
      })
    });
  })
  })
});

router.post('/API/deletemood', function(req,res,next){
 Mood.findOneAndRemove({"_id":req.body.id}).exec(function(err, rec) {
  if (err){ return next(err); }
    res.json(rec);
  })
})

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
 Activity.findOneAndRemove({"name":req.body.name}).exec(function(err, rec) {
  if (err){ return next(err); }
    res.json(rec);
  })
})

router.post('/API/checkactivity', function(req, res, next) {
  User.findOne({"username":req.body.username}).exec(function(err, user){
    Activity.find({"user": user._id, "name": req.body.a}, function(err,activities){
      if (activities.length) {
        res.json({'activity': 'exists'})
      } else {
        res.json({'activity': 'none'})
      }
    });
  })
});

router.post('/API/addcategories', function(req, res, next){
  MoodCategory.insertMany(req.body.cats, function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  })
})

router.get('/API/moods', function(req, res, next){
  MoodCategory.find(function(err,moods){
    if (err) { return next(err); }
    res.json(moods);
  });
})

module.exports = router;
