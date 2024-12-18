var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
   /* console.log(req.session.username);
    console.log(req.session.username.role);
    console.log(database.users.data[req.session.username]); n
console.log(database.users.data[req.session.role]); */
  res.render('admin', { title: 'admin', user: req.session.username, usuarios: database.users.data });
  //console.log("123123", database.users.data);
  
});

router.post('/deleteUser',function(req, res, next) {
    
    //si logeas como admin, puedes borrar el usuario recibido que esta en body  
         if(req.session.username.role == 'admin'){
             delete database.users.data[req.body.username];
             res.redirect("/admin");
           } else {
             req.session.error = "Unauthorized access";
             res.redirect("/");
           }
     }
 
 
   );

module.exports = router;