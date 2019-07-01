var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'See, the Sea' });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    res.redirect('/login');
  })
  // res.render('index', { title: 'See, the Sea' });
});

router.get('/cam', function(req, res, next) {
  if(!req.session.user_id){
    res.redirect('/login');
  }else{
    res.render('cam', { title: 'See, the Sea' });
  }
});

module.exports = router;
