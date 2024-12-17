const express = require("express");
const router = express.Router();
const database = require("../database"); // Importar el archivo de base de datos

router.post("/cookies/aceptar", (req, res) => {
    // Guardar en la sesión que las cookies fueron aceptadas
    req.session.cookiesAccepted = true;
    console.log(req.session);
    
    // Si el usuario está logueado, actualiza su información en la base de datos
    if (req.session.username) {
        console.log("hola adios");
        const username = req.session.username;

        // Guarda en la base de datos que aceptó las cookies
        database.users.data[username].cookiesAccepted = true;
        console.log(`Usuario ${username} aceptó las cookies.`);
    }

    res.status(200).send(req.session.cookiesAccepted);
});

module.exports = router;
