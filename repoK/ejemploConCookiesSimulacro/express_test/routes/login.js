var express = require('express');
var router = express.Router();

 const database = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.username} );
});
/*
router.post('/', function(req, res, next) {
  console.log(req.session);
  console.log("BODYKLK",req.body);
  

  let user = req.body.username;
  let password = req.body.pass;
  if(user === "admin" && password === "1234"){
    req.session.username = user; //// Almacenas el nombre de usuario en la sesión para que persista entre las solicitedes
    //como http es un protocolo sin estado, la info de la solictud anterior no se transfiere 
    //logrando asi la autenticación del usuario
    console.log("wei, ",req.session );
    console.log(req.session.username == req.body.username);
    console.log(user);
    res.redirect('/restricted');
  }else{
    res.render('login', {user: req.session.username});
  }

  
});

*/

router.post('/', async function(req, res, next) {
  /*
if(await database.users.isLoginRight(req.body.username, req.body.pass)){
  

  req.session.username = users;

  res.redirect('/restricted');
}else{
  res.render('login', {user: req.session.username});
}
  */
const { username, pass } = req.body;
try {
    const isValid = await database.users.isLoginRight(username,pass) ;

    if (isValid) {
        req.session.username = username; 
        console.log(`Usuario ${username} ha iniciado sesión.`);
        res.redirect('/restricted'); 
        
      
    }
} catch (error) {
    
    res.status(400).render('login', { user: null, error: error.message });
}


});



module.exports = router;
