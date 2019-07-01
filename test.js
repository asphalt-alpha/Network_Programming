
const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('sha256').update('admin').digest('base64');
const hash2 = crypto.createHash('sha256').update('admin').digest('base64');
console.log(hash);
console.log(hash2);

var salt='';
var pw_original='admin';
var pw='';
crypto.randomBytes(64,(err,buf)=>{
    if(err) console.log(err);

    salt = buf.toString('base64');
    console.log('salt = ',salt);
});
crypto.pbkdf2('admin',salt, 100000, 64, 'sha512', (err, derivedKey)=>{
    if(err) console.log(err);

    pw = derivedKey.toString('base64');
    console.log('pw = ',pw);
});