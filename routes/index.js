var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var camConfig = require('../model/camConfig');

var V_src = `http://${camConfig.host}:${camConfig.port}/?action=stream`
var I_src = `http://${camConfig.host}:${camConfig.port}/?action=snapshot`

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'See the Sea'
  });
  console.log(req.session);
  console.log(req.session.user_id); 
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    res.redirect('/login');
  })
});

router.get('/cam', function(req, res, next) {
  if(!req.session.user_id){
    res.redirect('/login');
  }else{
    res.render('cam', {
      title: 'See the Sea',
      cam: V_src,
      image: I_src
    });
  }
});

module.exports = router;
