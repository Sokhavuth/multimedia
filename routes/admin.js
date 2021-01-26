// routes/users.js
const express = require('express');
const router = express.Router();
const utility = require('../utility');

router.get('/', function(req, res, next){
  if(req.session.user)
    res.redirect('/admin/dashboard');
  else
    res.redirect('/admin/login');
});

router.get('/login', function(req, res, next){
  const login = require('../controllers/login');
  login.getLogin(res);
});

router.post('/login', function(req, res, next){
  const login = require('../controllers/login');
  login.postLogin(req, res);
});

router.get('/dashboard', function(req, res, next){
  const index = require('../controllers/dashboard/index');
  index.getIndex(req, res);
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
  const author = require('../controllers/dashboard/author');
  author.getAuthor(req, res);
});

router.post('/author', function(req, res, next){
  const author = require('../controllers/dashboard/author')
  author.postAuthor(req, res);
});

module.exports = router;