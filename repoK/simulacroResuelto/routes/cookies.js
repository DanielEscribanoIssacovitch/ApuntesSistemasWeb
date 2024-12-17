const express = require('express');
const router = express.Router();
const database = require('../database');
/* GET home page. */
router.post('/cookies', function(req, res, next) {
    
    req.session.cookiesAccepted = true;
    console.log(req.session);

    if(req.session.user){
        const username = req.session.user.username;
        console.log(username);
        console.log("123 ");
        if (database.user.data[username]) {
            console.log("HOLA ");
            database.user.data[username].cookiesAccepted = true;
            console.log(`Usuario ${username} aceptó las cookies.`);
        } else {
            console.error(`El usuario ${username} no existe en la base de datos.`);
        }
    }
    res.status(200).send(req.session.cookiesAccepted);
});

module.exports = router;