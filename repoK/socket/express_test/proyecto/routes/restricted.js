var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('restricted', { title: 'Restricted', user: req.session.name });
});

module.exports = router;