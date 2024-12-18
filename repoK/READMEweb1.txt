README

1) CLONAR
2) cd proyecto
3) npm install
4) DEBUG=express-test:* npm start
y ver el puerto en www
5) Definir rutas en app.js (indexm login y restricted)
6) Definir las plantillas ejs, porque en nav hacer una lista desornada, 

header.ejs



<nav>
                        <ul>
                            <li> <a href="/"> HOME</a></li>
                            <%if (user) { %>
                                <li> <a href= "/restricted">  Restricted</a> </li>
                                <li> <a href="/logout"> Logout</a></li>

                            <% } else { %> 
                                <li> <a href="/login"> Login</a></li>
                            <% } %>
                        </ul>

                    </nav>






cuando usar JavaScript incrustado, para ver si el user se ha registrado

<%if (user) { %>
<li> <a href= "/restricted">
<% } else { %> 

<li> <a href="/login"> Login</a></li>



7) Si en tu aplicación estas usando, en este caso, en header usas una variable defindia en las plantillas ejs, por je, user, necesitas declarar un middleware  dentro de app.js para protege rutas restringidas solo para usuarios que han iniciado sesión
para ello, en app.js añades configuración adecuada del middleware de sesiones en tu aplicación, es decir, 

const session = require('express-session');

app.use(session({
  secret: 'your_secret_key', // Cambia esto por una clave segura
  resave: false,
  saveUninitialized: false,
}));

PARA RESOLVER EL ERROR DE QUE UNA VARIABLE NO ESTE  DEFINIDA DENTRO DE ALGUNA PLANTILLA EJS, poner res.render( {user: req.session.user}), esto ponerlo  en el get

si no encuentra el modulo: npm install express-session

8) En login.js, diseñar la ruta del post correspondiente al formulario de la plantilla login.ejs, es decir, la validación de si el usario esta registrdo

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Validar credenciales (simulación)
  if (username === 'admin' && password === '1234') {
    req.session.user = { username };
    res.redirect('/restricted');
  } else {
    req.session.error = "Usuario o contraseña incorrectas";
    res.redirect('login');
  }
});


9) Para el logout, añadir en app.js 

app.use('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
});

o mejor,
app.use('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar la sesión:', err);
      res.status(500).send('Error al cerrar la sesión');
    } else {
      res.redirect('/'); // Redirige al home o al login
    }
  });
});
10) Para el caso de un registro fallido, login fallido,


} else {
    req.session.error = "Usuario o contraseña incorrectas";
    res.redirect('login');
  }

o también, 

res.render('login', { title: 'Login', user: req.session.user, error: req.session.error/** asigna mensaje de error a la sesion de  usuario La sesión (req.session) ,
      es un objeto persistente que se mantiene entre las solicitudes HTTP de un client*/  });



render lo utilizas para cargar el html de una pagina, y normalmente cuando  renderizas la plantilla , esta se corresponde a la  de la ruta, mientras que redirect, lo utilizar para redirigir a otra ruta en la que se renderiza otro HTML




CSS:

a la hora de declarar una lista desorndenada, para que no aparezcan los puntos y esten las rutas alineadas


ul {
  list-style-type: none;
  display: flex;
}



para que halla espacio entre las rutas del nav
li {
  margin-right: 20px;
}


para centrar el div que cubre todo el formulario de login

.login-container {
  display: flex;
  width: 30%;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  border: 3px solid black;
  width: 300px;
  position: fixed;/** Asegura que el contenedor se posicione en relación con la ventana del navegador*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}


espacio entre username y password

.form-group {
  margin-bottom: 15px;
}


para tocar los labels de las etiquetas
.form-group label {
  display: block; /** poner labels arriba de la caja */ 
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
}


para hacer mas grande el input
.form-group input {
  width: 100%;
  padding: 10px;
  background-color: aquamarine; /* Color aquamarino */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

ajustar el botón con color, texto centrado
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
}



CSS PARRAFOS

.container {
  display: flex;
  justify-content: space-between;
  background-color: gray;
  padding: 20px;
  border: 5px solid black;
}

.card {
  flex: 1; /** los tres div tienen el mismo tamaño, no va por parrafo*/ 
  margin: 20px;  /**distancia entre cards */
  padding: 20px; /*  grosor de la caja blanca*/ 
  background-color: #eee;
  border-radius: 5px; /**  borde secciones blancas mas suave ne vez de cuadrado, esquinas del div*/
  
}



selector universal

* {
  margin: 0;/*Elimina todos los márgenes predeterminados */
  padding: 0; /* Elimina todo el relleno predeterminado */
  box-sizing: border-box; /* ancho y alto incluyan el contenido, el relleno y los bordes. */
} 

para el selector universal, importante paddig: 0 en el body

body {
  padding: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}






	