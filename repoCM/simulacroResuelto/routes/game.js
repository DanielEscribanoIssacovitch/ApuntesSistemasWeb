const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Renderiza la vista game.ejs y le pasa el usuario de la sesión o null si no hay sesión
    res.render('game', { user: req.session.user || null });
});

module.exports = router;
