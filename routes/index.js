var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'See, the Sea' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'See, the Sea' });
});

module.exports = router;
