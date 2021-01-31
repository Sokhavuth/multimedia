// routes/dashboard/author.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  if(req.session.user){
    const author = require('../../controllers/dashboard/author');
    author.getAuthor(req, res);
  }else
    res.redirect('/admin/login');
});

router.post('/', function(req, res, next){
  if(req.session.user){
    const author = require('../../controllers/dashboard/author');
    author.postAuthor(req, res);
  }else
    res.redirect('/admin/login');
});

router.get('/edit/:authorId', function(req, res, next){
  if(req.session.user){
    const author = require('../../controllers/dashboard/author');
    author.getAuthor(req, res);
  }else
    res.redirect('/admin/login');
});

router.post('/edit/:authorId', function(req, res, next){
  if(req.session.user){
    const author = require('../../controllers/dashboard/author');
    author.updateAuthor(req, res);
  }else
    res.redirect('/admin/login');
});

router.get('/delete/:authorId', function(req, res, next){
  if(req.session.user){
    const author = require('../../controllers/dashboard/author');
    author.deleteAuthor(req, res);
  }else
    res.redirect('/admin/login');
});

router.get('/load/:page', function(req, res, next){
  if(req.session.user){
    const author = require('../../controllers/dashboard/author');
    author.loadAuthor(req, res);
  }else
    res.redirect('/admin/login');
});

module.exports = router;