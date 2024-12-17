var socket = io();

        var form = document.getElementById('formChat');
        var input = document.getElementById('inputChat');
        var messages = document.getElementById('messages');
        var h1Text = document.querySelector('h1').textContent; // Ejemplo: "Welcome to Restricted, daniel"
        var username = h1Text.split(', ')[1]; // Extrae "daniel"

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', {
                    username: username,
                    message: input.value
                });
                input.value = '';
            }
        });

        socket.on('chat message', function(data) {
            var item = document.createElement('li');
            item.textContent = `[${data.time}] ${data.username}: ${data.message} `;
            messages.appendChild(item);
        });