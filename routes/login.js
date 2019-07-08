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
var accountState = '　';

router.get('/', function(req, res, next) {
    if(req.session.user_id){
        res.redirect('/cam');
    }
    else{
        res.render('login', {temp: accountState});
        accountState = '　';
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

        if(!results[0]){
            //res.send('<script type="text/javascript">alert("ID IS NOT MATCHED");window.location="/login"</script>');
            accountState = 'ID가 맞지 않습니다.';
            console.log('id is not matched');
        }
        else{
            var user = results[0];
            const hash = crypto.createHash('sha256').update(passwd).digest('base64');
            
            if(hash === user.passwd){
                console.log('login success');
                req.session.user_id = user.id;
                req.session.save(function(){
                });
            }else{
                accountState = '비밀번호가 맞지 않습니다.';
                console.log('passwd is not matched');
            }
        }
        res.redirect('/login');
    });
    //conn.end();
});

  module.exports = router;