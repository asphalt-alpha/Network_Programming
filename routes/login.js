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
    res.render('login', { title: 'See, the Sea' });
});

router.post('/',function(req,res){
    var id = req.body.id;
    var passwd = req.body.passwd;


});


  module.exports = router;