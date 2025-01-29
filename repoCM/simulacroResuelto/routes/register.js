const express = require('express');
const router = express.Router();
//Importamos la base de datos:
const database = require('../database');

//Ruta para registrar un usuario:
router.get('/', function(req, res) {
    res.render('register');
});

//Procesamiento de datos:
router.post("/", (req, res) => {
    const {username, password} = req.body;
    //redirige a la página de login si el usuario ya existe
    try{
        database.user.register(username, password);
        res.redirect("login");
    } catch (error){
        res.status(400).send(error.message);
    }
});

module.exports = router;