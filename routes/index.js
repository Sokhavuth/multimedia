// routes/index.js
var express = require('express');
var router = express.Router();
var vdict = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', vdict);
});

module.exports = router;
