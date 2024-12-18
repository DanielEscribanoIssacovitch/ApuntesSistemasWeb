var socket = io();

var form = document.getElementById('formChat');
var input = document.getElementById('inputChat');
var messages = document.getElementById('messages');

// Extraer nombre de usuario
var h1Text = document.querySelector('h1').textContent;
var username = h1Text.split(', ')[1]?.trim();

socket.emit('register user', username); // Registrar el usuario

// Crear sala pública
document.getElementById('createPublicRoom').addEventListener('click', () => {
    const roomName = prompt('Nombre de la sala pública:');
    if (roomName) socket.emit('create public room', roomName);
});

// Crear sala privada
document.getElementById('createPrivateRoom').addEventListener('click', () => {
    const roomName = prompt('Nombre de la sala privada:');
    const password = prompt('Contraseña de la sala privada:');
    if (roomName && password) socket.emit('create private room', { roomName, password });
});

// Unirse a una sala
document.getElementById('joinRoom').addEventListener('click', () => {
    const roomName = prompt('Nombre de la sala:');
    const password = prompt('Contraseña (deja vacío si es pública):');
    if (roomName) socket.emit('join room', { roomName, password });
});

// Enviar mensaje
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('room message', input.value);
        input.value = '';
    }
});

// Recibir mensajes de sala
socket.on('room message', function (data) {
    var item = document.createElement('li');
    item.textContent = `[${data.username}]: ${data.message}`;
    messages.appendChild(item);
});

// Actualizar lista de salas públicas
socket.on('room list', (rooms) => {
    console.log('Salas públicas disponibles:', rooms);
});

// Manejar errores de salas
socket.on('room error', (error) => {
    alert(error);
});
