var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', user: req.session.name });
});


router.post('/', async function(req,res, next){
    //priemro obtenemos los datos de la sesion
    console.log("session", req.session);
    console.log("body", req.body);

    const name = req.body.name;
    console.log("nameee", req.body.name);
    const pass = req.body.pass;

    const isValid = await database.user.isLoginRight(name, pass);

    req.session.name = database.user.data[name];
    console.log(req.session.name);
    if(isValid){
        res.redirect('/restricted');
    }else{
        res.redirect('/');
    }

});

module.exports = router;