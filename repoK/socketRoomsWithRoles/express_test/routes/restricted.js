var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('restricted', { title: 'Restricted', user: req.session.name.username, usuarios: database.user.data });
});

module.exports = router;