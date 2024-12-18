const boton_rechazar = document.getElementById("rechazar");
boton_rechazar.addEventListener("click", function() {
    document.location.href = "https://www.google.com/"
  });
 
const boton_aceptar = document.getElementById("aceptar");
const div_container = document.getElementById("cookie");
boton_aceptar.addEventListener("click", function(){
    div_container.style.visibility = 'hidden';


fetch("/cookies", {
  method: "POST"
}).then(response => response.json())
.then(data => {
    if (data.success) {
        console.log("Cookies aceptadas.");
        div_container.style.display = "none"; // Ocultar el banner
    }
})
.catch(error => console.error("Error al aceptar cookies:", error));
});
