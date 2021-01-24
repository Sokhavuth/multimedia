// routes/users.js
const express = require('express');
const vdict = require('../config');
const router = express.Router();
const usersdb = require('../models/usersdb')

router.get('/', function(req, res, next){
  if(req.session.user)
    res.send('dashboard');
  else
    res.redirect('/users/login');
});

router.get('/login', function(req, res, next){
  res.render('login', vdict);
});

router.post('/login', function(req, res, next){
  usersdb.users.findOne({username:req.body.username}, function (err, user){
    if (err) return console.error(err);
    if(user){
      if(usersdb.bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user.username;
        vdict.message = '';
        res.send('dashboard');
      }else{
        vdict.message = 'ពាក្យ​សំងាត់​មិនត្រឹមត្រូវ​ទេ';
        res.redirect('/users/login');
      }
    }else{
      vdict.message = 'ឈ្មោះ​អ្នក​ប្រើប្រាស់​មិន​ត្រឹមត្រូវ​ទេ';
      res.redirect('/users/login');
    }
  });
});

module.exports = router;