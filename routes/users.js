// routes/users.js
const express = require('express');
const vdict = require('../config');
const router = express.Router();
const usersdb = require('../models/usersdb')

router.get('/', function(req, res, next){
  if(req.session.user)
    res.redirect('/users/dashboard');
  else
    res.redirect('/users/login');
});

router.get('/login', function(req, res, next){
  res.render('login', vdict);
});

router.post('/login', function(req, res, next){
  usersdb.checkUser(req, res, vdict);
});

router.get('/dashboard', function(req, res, next){
  res.render('dashboard/index', vdict);
});

router.get('/logout', function(req, res, next){
  if(req.session.user){
    req.session.destroy(function (err) {
      res.redirect('/');
    });  
  }else
    res.redirect('/');
});

router.get('/author', function(req, res, next){
  if(req.session.user){
    res.render('dashboard/author', vdict);
  }else
    res.redirect('/users/login')
});

module.exports = router;