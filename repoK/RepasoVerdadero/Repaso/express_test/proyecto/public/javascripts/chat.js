console.log('Iniciando conexión...');
const socket = io(); // Inicializa la conexión con Socket.IO
console.log('Conexión establecida con el servidor');

// Seleccionar elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const username = document.querySelector("label").textContent.trim();

let currentChatUser = "";
// Función para agregar mensajes al DOM
function appendMessage(data) {
    const item = document.createElement('li');
    if (typeof data === 'string') {
        item.textContent = data; // Si es texto, imprimirlo directamente
    } else {
        item.textContent = `${data.username}: ${data.message}`; // Imprimir el usuario y el mensaje
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight); // Desplazar al final
}


// Mostrar historial de mensajes al conectarse
socket.on('chatHistory', (history) => {
    console.log('Historial de mensajes recibido:', history);
        history.forEach((data) => {
            appendMessage(data);
        });
    
});

function joinPrivateChat(receiver) {
    currentChatUser = receiver;
    socket.emit('joinRoom', { sender: username, receiver });
    console.log(`Uniéndose al chat privado con ${receiver}`);
}

// Enviar mensaje privado
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if ( currentChatUser) {
        socket.emit('privateMessage', { sender: username, receiver: currentChatUser, message });
        input.value = '';
        appendMessage(`Tú: ${message}`);
    }
});
// Escuchar mensajes privados desde el servidor
socket.on('privateMessage', (data) => {
    appendMessage(data, true);
});

// Escuchar mensajes públicos desde el servidor
socket.on('chatMessage', (data) => {
    appendMessage(data);
});

// Evento para enviar mensajes al servidor
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        if (currentChatUser) {
            // Enviar mensaje privado si hay un usuario seleccionado
            socket.emit('privateMessage', { sender: username, receiver: currentChatUser, message });
            appendMessage({ username: "Tú", message }); // Mostrar tu mensaje localmente
        } else {
            // Enviar mensaje público
            socket.emit('chatMessage', { username, message });
        }
        input.value = '';
    }
});


