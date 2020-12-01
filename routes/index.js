var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'a/A Express Skeleton Home' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
