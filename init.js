var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbConfig = require('./model/dbConfig');



 var salt='';
// var pw_original='admin';
// var pw='';
// crypto.randomBytes(64,(err,buf)=>{
//     if(err) console.log(err);

//     salt = buf.toString('base64');
//     console.log('salt = ',salt);
// });
// crypto.pbkdf2('admin',salt, 100000, 64, 'sha512', (err, derivedKey)=>{
//     if(err) console.log(err);

//     pw = derivedKey.toString('base64');
//     console.log('pw = ',pw);
// });

const hash = crypto.createHash('sha256').update('admin').digest('base64');

setTimeout(function(){
    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    
    var account = {'id': 'admin', 'passwd': hash, 'salt': salt};
    var sql = 'INSERT INTO Users SET ?';
    conn.query(sql,account, function(err, results, fields){
        if(err)
            console.log(err);
        else console.log('inserted admin');
    });
},4000);


