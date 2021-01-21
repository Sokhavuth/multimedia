// routes/index.js
const express = require('express');
const router = express.Router();
var vdict = require('../config');
const utility = require('../utility');

router.use(function(req, res, next){
  vdict.khDate = utility.toKhDate(new Date());
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', vdict);
});

module.exports = router;
