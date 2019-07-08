var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbConfig = require('../model/dbConfig');

var conn = mysql.createConnection(dbConfig);
var accountState = '　';
var confirmState = 0;

router.get('/', function(req, res, next) {
    if(!req.session.user_id){
        res.redirect('/login');
    }
    else if(confirmState){
        res.redirect('/logout');
        confirmState=0;
    }
    else{
        res.render('mypage', {temp: accountState});
        accountState = '　';
    }
});

router.post('/',function(req,res){
    var id = req.session.user_id;
    var passwd = req.body.passwd;
    var newId = req.body.newId;
    var newPasswd = req.body.newPasswd;
    var newPasswdConfirm = req.body.newPasswdConfirm;
 
    var sql = 'SELECT * FROM Users WHERE id=?';
    var changeSql = 'UPDATE Users SET id =?, passwd =? WHERE id =?';
    conn.query(sql,[id], function(err, results){
        if(err)
            console.log(err);
           
        else{
            var user = results[0];
            console.log(user.id);

            const hash = crypto.createHash('sha256').update(passwd).digest('base64');
            if(hash !== user.passwd){
                accountState = ' 기존 비밀번호가 맞지 않습니다.';
                console.log('passwd is not matched');
            }
            else{
                if(newPasswd === newPasswdConfirm){
                    const newhash = crypto.createHash('sha256').update(newPasswd).digest('base64');
                    conn.query(changeSql,[newId,newhash,user.id],function(err,results){
                        confirmState=1;
                    });
                }else{
                    accountState = '새로운 비밀번호가 일치하지 않습니다.';
                }
            }
        }
        res.redirect('/change');
    });
    //conn.end();
});

  module.exports = router;