const express = require('express');
const router = express.Router();
const database = require('../database'); // Asegúrate de que el path a tu base de datos es correcto

// Ruta para listar los usuarios
router.get('/list', (req, res) => {
    res.json(database.user.data); // Devuelve todos los usuarios en formato JSON
});

// localhost:3000/users/list
module.exports = router;
