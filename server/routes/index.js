var express = require('express');
var router = express.Router();
const env = require('env2')('.\env');

let jwt = require('express-jwt');

let auth = jwt({secret: process.env.MOOD_BACKEND_SECRET, userProperty: 'payload'});

module.exports = router;
