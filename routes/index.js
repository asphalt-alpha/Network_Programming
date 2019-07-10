var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var camConfig = require('../model/camConfig');
var fs = require('fs');

function setLED(flag) {
  fs.open('/dev/ttyUSB0','a', 666, function(e, fd){  //쓰기로 열기
    console.log('serial opened');
		fs.write(fd, flag, null, null, null, function(){
      console.log('write successed');
			fs.close(fd, function(){
        console.log('serial closed');
      });
		});	
	});
}

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

router.get('/led/on', function(req,res,next){
  if(!req.session.user_id){
    res.redirect('/login');
  }else{
    setLED(2);
    res.redirect('/cam');
  }
});

router.get('/led/off', function(req,res,next){
  if(!req.session.user_id){
    res.redirect('/login');
  }else{
    setLED(1);
    res.redirect('/cam');
  }
});


module.exports = router;
