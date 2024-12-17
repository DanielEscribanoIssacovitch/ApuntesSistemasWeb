var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {  title: 'Hola ' , user: req.session.user});
});

router.post('/', function(req, res, next){

    let user = req.body.user;
    let password = req.body.password;

    if(user === "admin" && password === "1234"){
        req.session.user = {username: user}
        res.redirect('/restricted');
    }else{
        res.render('login', { title: 'Hola ', user: req.session.user})
    }

});

module.exports = router;