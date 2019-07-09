var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbConfig = require('./model/dbConfig');

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


