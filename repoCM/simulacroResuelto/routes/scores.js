const express = require('express');
const router = express.Router();
const database = require('../database');

// Ruta para guardar la puntuación:
router.post('/save', async (req, res) => {
    const { username, score } = req.body;

    if (!username || typeof score !== 'number') {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
        if (!database.user.data[username]) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Guardar puntuación (sobreescribiendo si ya existe)
        database.user.data[username].score = score;

        return res.json({ success: true, message: 'Puntuación guardada' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar puntuación' });
    }
});

// Ruta para obtener los puntajes:
router.get('/scores', (req, res) => {
    const scores = Object.keys(database.user.data).map(username => ({
        username,
        score: database.user.data[username].score || 0
    }));

    return res.json(scores);
});

module.exports = router;
