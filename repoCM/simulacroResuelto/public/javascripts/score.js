let score = 0;
let username = "<%= user ? user.username : 'Invitado' %>";


document.getElementById('clickButton').addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
});

document.getElementById('finishButton').addEventListener('click', async () => {
    if (username === 'Invitado') {
        alert("Debes iniciar sesión para guardar tu puntuación.");
        return;
    }

    try {
        const response = await fetch('/scores/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, score})
        });

        const result = await response.json();
        if (result.success) {
            alert("Puntuación guardada con éxito.");
            await loadScores(); // Recargar tabla tras guardar
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Error al enviar la puntuación:", error);
    }
});

async function loadScores() {
    try {
        const response = await fetch('/scores/scores');
        const scores = await response.json();

        const tbody = document.getElementById('scoreboardBody');
        tbody.innerHTML = ""; // Limpiar tabla

        scores
            .sort((a, b) => b.score - a.score) // Ordenar de mayor a menor
            .forEach(({username, score}) => {
                const row = `<tr><td>${username}</td><td>${score}</td></tr>`;
                tbody.innerHTML += row;
            });
    } catch (error) {
        console.error("Error al cargar la tabla:", error);
    }
}

loadScores(); // Cargar puntuaciones al inicio