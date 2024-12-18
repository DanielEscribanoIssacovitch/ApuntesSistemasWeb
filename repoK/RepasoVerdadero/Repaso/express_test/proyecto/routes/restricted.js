var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('restricted', { title: 'restrcited', user: req.session.username});
});

module.exports = router;
