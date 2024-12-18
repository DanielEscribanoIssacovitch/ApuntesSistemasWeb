var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login', user: req.session.username });
});

router.post('/',  async function(req, res){
/*
    console.log("sessionoooon", req.session);
    console.log("bodyyy", req.body);
    console.log(database.users.data[req.body.username].role);
    console.log("33",req.session.username);
*/
    const user = req.body.username;

    const isValid = await database.users.isLoginRight(user, req.body.password);
//cuando se loguea, al objeto session.username le añadimos todo lo de la BD
    if(isValid){
        req.session.username = database.users.data[user];
        
        console.log(req.session.username);
        /*console.log(req.session.username.role);
        */
        res.redirect('restricted');
    }else{
        res.render('login');
    }
});

module.exports = router;
