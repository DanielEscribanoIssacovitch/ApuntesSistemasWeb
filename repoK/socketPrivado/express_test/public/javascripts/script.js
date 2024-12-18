var socket = io();

var form = document.getElementById('formChat');
var input = document.getElementById('inputChat');
var messages = document.getElementById('messages');

// Extraer el nombre de usuario desde la etiqueta <h1>
var h1Text = document.querySelector('h1').textContent; // Ejemplo: "Welcome to Restricted, daniel"
var username = h1Text.split(', ')[1]?.trim(); // Extraer "daniel"

// Registrar el usuario en el servidor
socket.emit('register user', username);

// Enviar mensaje privado
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        const recipient = prompt("Escribe el nombre del destinatario:");

        if (recipient) {
            socket.emit('chat private', {
                to: recipient,
                username: username,
                message: input.value
            });
            input.value = '';
        } else {
            alert("Debes especificar un destinatario.");
        }
    }
});

// Recibir mensajes privados
socket.on('chat private', function (data) {
    var item = document.createElement('li');
    item.style.color = 'red'; // Mensajes privados en rojo
    item.textContent = `(Privado) [${data.time}] ${data.username}: ${data.message}`;
    messages.appendChild(item);
});
