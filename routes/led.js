var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbConfig = require('../model/dbConfig');
var led = require('../model/ledControl');
var fs = require('fs');

var conn = mysql.createConnection(dbConfig);



router.get('/',function(req,res,next){
    if(!req.session.user_id){
        res.redirect('/login');
    }else{
        res.render('led',{temp:'　'});
    }
});

router.post('/', function(req,res,next){
    var enable = req.body.enable;
    var start = req.body.start;
    var end = req.body.end;

    console.log(enable);
    console.log(start);
    console.log(end);

    var sql = 'SELECT * FROM led WHERE id=?';
    conn.query(sql,[req.session.user_id], function(err, results){
        if(err)
            console.log(err);

        if(!results[0]){
            var info = {'id': req.session.user_id,'enable':enable,'start' : start,'end' : end}
            var Isql = 'INSERT INTO led SET ?';
            conn.query(Isql,info, function(err, results, fields){
                if(err) console.log(err);
                else console.log('inserted time info')
            });
        }else{
            var info = {'id': req.session.user_id,'enable':enable,'start' : start,'end' : end}
            var Isql = 'UPDATE led SET id=?,enable=?,start=?,end=? WHERE id=?';
            conn.query(Isql,[req.session.user_id,enable,start,end,req.session.user_id], function(err, results, fields){
                if(err) console.log(err);
                else console.log('updated time info')
            });
        }
    });


    //res.send('<script>alert("success")</script>');
    res.redirect('/led');
})

router.get('/on', function(req,res,next){
  if(!req.session.user_id){
    res.redirect('/login');
  }else{

    led.set('2');
    res.redirect('/cam');
  }
});

router.get('/off', function(req,res,next){
  if(!req.session.user_id){
    res.redirect('/login');
  }else{
    led.set('1');
    res.redirect('/cam');
  }
});


module.exports = router;
