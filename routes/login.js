var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbConfig = require('../model/dbConfig');

var conn = mysql.createConnection(dbConfig);

router.get('/', function(req, res, next) {
    if(req.session.user_id){
        res.redirect('/cam');
    }
    else{
        res.render('login', { title: 'See the Sea' });
    }
});

router.post('/',function(req,res){
    var id = req.body.id;
    var passwd = req.body.passwd;

    console.log('id =', id);
    console.log('passwd =',passwd);

    var sql = 'SELECT * FROM Users WHERE id=?';
    conn.query(sql,[id], function(err, results){
        if(err)
            console.log(err);

        if(!results[0])
            console.log('id is not matched');
        else{
            var user = results[0];
            const hash = crypto.createHash('sha256').update(passwd).digest('base64');
            
            if(hash === user.passwd){
                console.log('login success');
                req.session.user_id = user.id;
                req.session.save(function(){
                    res.redirect('/login');
                });
            }else{
                console.log('passwd is not matched');
            }
        }

    });
    //conn.end();
});


  module.exports = router;