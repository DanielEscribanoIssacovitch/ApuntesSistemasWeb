// Establecemos la conexión con el servidor usando Socket.IO
const socket = io();

// Escuchamos el evento 'chat' para recibir mensajes enviados por otros usuarios
socket.on('chat', (msg) => {
    // Extraemos el emisor y el mensaje de los datos recibidos
    const emisor = msg.emisor;
    const message = msg.message;

    // Llamamos a la función para renderizar el mensaje recibido
    renderOtherMessage(emisor, message);
});

// Función que renderiza un mensaje enviado por el usuario
function renderMyMessage(message){
    console.log("entra"); // Mensaje para verificar que la función se ejecuta
    // Obtenemos el contenedor donde se mostrarán los mensajes
    const messagesContainer = document.getElementById('messagesContainer');

    // Creamos un nuevo elemento de lista (<li>) para el mensaje
    let item = document.createElement("li");

    // Creamos un contenedor para el contenido del mensaje
    let contentDiv = document.createElement("div");
    contentDiv.className = "content-message";

    // Creamos una etiqueta <label> para el mensaje
    let info_label = document.createElement("label");
    info_label.textContent = message; // Asignamos el texto del mensaje
    info_label.className = "info-message";  // Le damos una clase CSS para estilo

    // Creamos una etiqueta <label> para mostrar el autor del mensaje
    let author_label = document.createElement("label");
    author_label.textContent = "YOU"; // El autor es el usuario que envía el mensaje
    author_label.className = "author-message my-message"; // Estilo específico para el mensaje del usuario

    // Añadimos las etiquetas de autor y mensaje al contenedor de contenido
    contentDiv.appendChild(author_label);
    contentDiv.appendChild(info_label);

    // Añadimos el contenido del mensaje al elemento <li>
    item.appendChild(contentDiv);
    item.className = "my-message message"; // Clase CSS para estilo

    // Añadimos el elemento <li> al contenedor de mensajes
    messagesContainer.appendChild(item);
}

// Función que renderiza un mensaje recibido de otro usuario
function renderOtherMessage(emisor, message){
    // Obtenemos el contenedor donde se mostrarán los mensajes
    const messagesContainer = document.getElementById('messagesContainer');

    // Creamos un nuevo elemento de lista (<li>) para el mensaje
    let item = document.createElement("li");

    // Creamos un contenedor para el contenido del mensaje
    let contentDiv = document.createElement("div");
    contentDiv.className = "content-message";

    // Creamos una etiqueta <label> para el mensaje
    let info_label = document.createElement("label");
    info_label.textContent = message; // Asignamos el texto del mensaje
    info_label.className = "info-message";  // Le damos una clase CSS para estilo

    // Creamos una etiqueta <label> para mostrar el autor del mensaje
    let author_label = document.createElement("label");
    author_label.textContent = emisor; // El autor es el que envió el mensaje
    author_label.className = "author-message other-message"; // Estilo específico para el mensaje de otros usuarios

    // Añadimos las etiquetas de autor y mensaje al contenedor de contenido
    contentDiv.appendChild(author_label);
    contentDiv.appendChild(info_label);

    // Añadimos el contenido del mensaje al elemento <li>
    item.appendChild(contentDiv);
    item.className = "other-message message"; // Clase CSS para estilo

    // Añadimos el elemento <li> al contenedor de mensajes
    messagesContainer.appendChild(item);
}

// Escuchamos el evento 'submit' del formulario para evitar que la página se recargue
document.getElementById("form_message").addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto de enviar el formulario
});

// Función para enviar un mensaje al servidor
function sendMessage(emisor){
    // Obtenemos el valor del campo de entrada del mensaje
    const message = document.getElementById("messageInput");
    console.log(`message: ${message.value}, emisor: ${emisor}`); // Imprimimos los valores en consola para depuración

    // Enviamos el mensaje al servidor usando Socket.IO
    socket.emit('chat', {
        message: message.value, // El contenido del mensaje
        emisor: emisor // El nombre del usuario que envía el mensaje
    });

    // Llamamos a la función para renderizar el mensaje enviado por el usuario
    renderMyMessage(message.value);

    // Limpiamos el campo de entrada del mensaje después de enviarlo
    message.value = "";
}
