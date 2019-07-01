var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbConfig = require('../model/dbConfig');

var conn = mysql.createConnection(dbConfig);
conn.connect();


router.get('/', function(req, res, next) {
    //if()
    res.render('login', { title: 'See the Sea' });
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
                // req.session.id = user.id;
                // req.session.save(function(){
                //     return res.redirect('/cam');
                // });
            }else{
                console.log('passwd is not matched');
            }
            // console.log(' d b   salt  : ', user.salt);
            // console.log(' d b  passwd : ', user.passwd);
            // crypto.pbkdf2('admin',user.salt, 100000, 64, 'sha512', (err, derivedKey)=>{
            //     console.log('local passwd : ', derivedKey.toString('base64'));
            //     if(err) console.log(err);
                
            //     if(derivedKey.toString('hex')===user.passwd){
            //         console.log('login success');
            //     }else{
            //         console.log('passwd is not matched');
                    
            //     }
            // });
        }

    });

    res.redirect('/login');
});


  module.exports = router;