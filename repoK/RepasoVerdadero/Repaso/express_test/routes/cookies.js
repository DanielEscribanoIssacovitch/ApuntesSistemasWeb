var express = require('express');
var router = express.Router();
const database = require('../database');
const { data } = require('../database/models/user.model');

/* GET home page. */
router.post('/cookies', function(req, res, next) {

req.session.cookiesAcepted= true;
/*
console.log("2", req.session);
console.log("2", req.session.cookiesAcepted);
console.log("2", req.session.username);
console.log("2", req.body);

console.log("2", req.session.username.username);
*/
if(req.session.username){
    const user = req.session.username.username;
    if(database.users.data[user]){
        console.log("hola");
        database.users.data[user].cookiesAcepted = true;
        console.log(`Usuario ${user} aceptó las cookies.`);
    }else{
        console.error(`El usuario ${user} no existe en la base de datos.`);
        
    }
}
    res.status(200).json({  success: true  });
});

module.exports = router;