// routes/users.js
const express = require('express');
const vdict = require('../config');
const router = express.Router();
const usersdb = require('../models/usersdb')

router.get('/', function(req, res, next) {
  res.render('login', vdict);
});

module.exports = router;