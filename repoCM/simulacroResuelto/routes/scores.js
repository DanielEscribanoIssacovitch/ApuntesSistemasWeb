const express = require('express');
const router = express.Router();
const database = require('../database');

// Ruta para guardar la puntuación
router.post('/save', async (req, res) => {
    const { username, score } = req.body;

    // Si el nombre de usuario no es válido o la puntuación no es un número
    if (!username || typeof score !== 'number') {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
        // Si el usuario no está registrado, se crea un usuario nuevo con nombre de "Invitado"
        if (!database.user.data[username]) {
            if (username === "Invitado") {
                database.user.data[username] = { score: 0 }; // Crear nuevo usuario 'Invitado' si no existe
            } else {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }

        // Guardar o actualizar la puntuación
        database.user.data[username].score = score;

        return res.json({ success: true, message: 'Puntuación guardada' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar puntuación' });
    }
});

// Ruta para obtener las puntuaciones
router.get('/scores', (req, res) => {
    const scores = Object.keys(database.user.data).map(username => ({
        username,
        score: database.user.data[username].score || 0
    }));

    return res.json(scores);
});

module.exports = router;

