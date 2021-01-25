// routes/users.js
const express = require('express');
const vdict = require('../config');
const utility = require('../utility')
const router = express.Router();
const deepcopy = require('deepcopy');
const usersdb = require('../models/usersdb')

router.get('/', function(req, res, next){
  if(req.session.user)
    res.redirect('/users/dashboard');
  else
    res.redirect('/users/login');
});

router.get('/login', function(req, res, next){
  const data = deepcopy(vdict);
  data.site_title = "ទំព័រ​ចុះ​ឈ្មោះ";
  res.render('login', data);
});

router.post('/login', function(req, res, next){
  const data = deepcopy(vdict);
  usersdb.checkUser(req, res, data);
});

router.get('/dashboard', function(req, res, next){
  if(req.session.user){
    const data = deepcopy(vdict);
    data.site_title = "ទំព័រ​គ្រប់គ្រង";
    res.render('dashboard/index', data);
  }else{
    res.redirect('/users/login');
  }
});

router.get('/logout', function(req, res, next){
  if(req.session.user){
    req.session.destroy(function (err) {
      res.redirect('/');
    });  
  }else{
    res.redirect('/');
  }
});

router.get('/author', function(req, res, next){
  if(req.session.user){
    const data = deepcopy(vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = utility.setDate();
    res.render('dashboard/author', data);
  }else{
    res.redirect('/users/login');
  }
});

router.post('/author', function(req, res, next){
  if(req.session.user){
    const data = deepcopy(vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = utility.setDate();
    usersdb.insert(req, res, data)
  }
});

module.exports = router;