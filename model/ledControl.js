var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var moment = require('moment');
require('moment-timezone');
var dbConfig = require('../model/dbConfig');
moment.tz.setDefault("Asia/Seoul");
var fs = require('fs');

var conn = mysql.createConnection(dbConfig);

function set(flag) {
    fs.open('/dev/ttyUSB0','a', 666, function(err, fd){  //쓰기로 열기
        if(err){
            console.log('serial failed')
        }
        console.log('serial opened');
        fs.writeSync(fd, flag);
        console.log('write success');
        fs.close(fd, function(){
            console.log('serial closed');
        });
	});
}

function autoSet(){
    var time = moment().format('HH:mm');
    var sql = 'SELECT * FROM led';
    conn.query(sql,function(err, results){
        if(err)
            console.log(err);

        if(!results[0]){
            console('timer is undefined');
        }
        else{
            var target = results[0];
            if(target.enable == 'true'){
                if(target.start.toString().substring(0,5) == time){
                    set('2');
                }else if(target.end.toString().substring(0,5) == time){
                    set('1');
                }
                else{
                    /*
                    console.log('time ',time);
                    console.log('start ',target.start.toString().substring(0,5));
                    console.log('end ',target.end.toString().substring(0,5));
                    */
                }
            }
        }
    });
}

module.exports.set = set;
module.exports.autoSet = autoSet;