var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'See, the Sea' });
});

router.get('/cam', function(req, res, next) {
  res.render('cam', { title: 'See, the Sea' });
});

module.exports = router;
