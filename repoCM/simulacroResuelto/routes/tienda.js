const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', {user:req.session.user});
});

router.get('/tiendaespecial', function(req, res, next) {
  res.render('tiendaespecial', {user:req.session.user});
});

module.exports = router;
