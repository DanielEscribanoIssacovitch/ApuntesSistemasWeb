var express = require('express');
var router = express.Router();
var db = require('../database/appddbb');  // Asegúrate de importar correctamente

router.get('/', function(req, res) {
    const userData = req.session.user;
    const chatTitle = req.query.chatTitle;  // Obtener chatTitle de los parámetros de la consulta

    // Verificar si chatTitle está definido
    if (!chatTitle) {
        return res.status(400).send("Chat title is required");
    }

    const mensajes = db.chat.getChat(chatTitle);  // Acceder correctamente a db.chat

    res.render('chat', {
        chatTitle,
        username: userData.username,
        content: mensajes 
    });
});

// Enviar un mensaje al chat
router.post('/send-message', function(req, res) {
    const { chatTitle, message, username } = req.body;

    if (!message || !username || !chatTitle) {
        return res.status(400).send("Datos incompletos");
    }

    // Registrar el mensaje en la base de datos
    db.chat.registerMessage(chatTitle, username, message);  // Usar db.chat
    res.status(200).send("Mensaje enviado");
});

module.exports = router;
