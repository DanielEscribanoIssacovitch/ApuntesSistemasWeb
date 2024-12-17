var express = require('express');
var router = express.Router();
const database = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.username});
});
/** 
router.post('/', function(req, res, next){

    let user = req.body.username;
    let password = req.body.pass;

    if(user === "admin" && password === "1234"){
        /** esta linea es impornate, tnato para cuando el usuario introduce user y pass invalida, y para que te aparezca logout 
         * Cuando un usuario inicia sesión correctamente, los datos del usuario (en este caso, el username) se almacenan en la sesión (req.session).
Esto permite que la aplicación mantenga al usuario autenticado mientras navega por otras páginas del sitio.
En las vistas EJS (como header.ejs), el botón logout y otras partes del diseño dependen de la existencia de user en la sesión

Si la validación de credenciales falla:
res.render('login', { user: req.session.username });

Esta línea asegura que user tenga un valor undefined o null cuando las credenciales no son válidas, lo que mantiene consistencia en el comportamiento de la vista



        
        req.session.username = {username: user}
        res.redirect('restricted');
    }else{
        res.render('login', { user: req.session.username});
    }
}); */


router.post('/', async (req, res) => {
    const user = req.body.username;
    if(await database.user.isLoginRight(user, req.body.pass)){
      req.session.username = {username: user};
      req.session.message = "¡Login correcto!"
      res.redirect('restricted');
    } else {
      req.session.error = "Incorrect username or password.";
      res.redirect('login');
    }
  });
module.exports = router;