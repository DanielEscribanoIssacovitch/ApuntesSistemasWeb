const socket = io();

const form = document.getElementById('formChat');
const input = document.getElementById('inputChat');
const messages = document.getElementById('messages');

// Mostrar historial de mensajes al conectarse
socket.on('chat history', (msgHistory) => {
    messages.innerHTML = ''; // Limpiar lista de mensajes
    msgHistory.forEach((msg) => {
        addMessage(msg);
    });
});

// Escuchar nuevos mensajes
socket.on('chat message', (msg) => {
    addMessage(msg);
});

// Función para agregar un mensaje a la lista
function addMessage(msg) {
    const item = document.createElement('li');
    item.textContent = `[${msg.timestamp}] ${msg.username}: ${msg.message}`;
    messages.appendChild(item);
}

// Enviar mensaje
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('chat message', input.value.trim());
        input.value = '';
    }
});


socket.on('connect', () => {
    console.log('Conexión Socket.IO establecida:', socket.id);
});

socket.on('connect_error', (err) => {
    console.error('Error de conexión con Socket.IO:', err);
});