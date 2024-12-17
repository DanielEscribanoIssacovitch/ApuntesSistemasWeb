//routes/chat.js
var express = require('express');
var router = express.Router();

const db = require('../database/appddb.js');

router.get('/', function(req, res) {
    const userData = req.session.user;
    const mensaje = "probando"
    res.render('chat', {chatTitle: "chat_prueba", username : userData.username, content: mensaje});
});

// Enviar un mensaje al chat
// router.post('/send-message', function(req, res) {
//     const { chatTitle, message, username } = req.body;
//     try{
//         chat.data[chatTitle][username].push(message);
//     } catch {
//         console.error("Peta")
//     }
// });

module.exports = router;