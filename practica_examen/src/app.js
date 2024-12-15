// req: Solicitud HTTP realizada por el cliente.
// res: Representa la respuesta del servidor hacia el cliente.
// normalmente viene con res.render("index") o la vista que quieres demostrar
// next: en una funcion para el middleware


var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Van a manejar los middlewares
var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
//var usersRouter = require('./routes/users');

var app = express();

app.use( //Middleware para la sesion.
  session({
      secret: 'mi_secreto', // Clave secreta para firmar las cookies de sesión
      resave: false, // Si se debe de guarda la sesion nuevamente aunque no se modifique
      saveUninitialized: true, //Guarda sesiones nuevas incluso si no hay datos
      cookie: { secure: false }, // Cookie expira en 60 segundos
  })
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));  //Donde estan las vistas
app.set('view engine', 'ejs');  // Motor de las vistas en este caso ejs

app.locals.title = "Práctica de examen"; //El titulo global
app.locals.cookies = false; //Las cookies estan en false por defecto

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //Archivos estaticos (CSS, imagenes, JS)

//Rutas y middleware personalizado
app.use('/', check_login, indexRouter);
app.use('/chat', restricted, check_login, chatRouter);
// app.use() montar el middleware
// /login ruta base que se esta asociando: http://<servidor>/login
// check_login es un middleware que se ejecuta antes de pasar al siguiente middleware
// loginRouter es otro middleware
app.use('/login', check_login, loginRouter);
app.use('/users', usersRouter);

function restricted(req, res, next){  //restricted bloquea a usuarios no autenticados
  if(req.session.user){
    next(); //Si el usuario esta autenticado, continua
  } else {
    res.redirect("login");  // si no, redirige a login
  }
}

//Añade los datos de sesion al local para ser usado en las vistas
function check_login(req, res, next) {
  res.locals.islog = req.session.user ? true : false;
  if(req.session.user){
    res.locals.username = req.session.user.username;
  }else{
    res.locals.username = null;
  }
  next();
}

//Guardar cookies
app.post('/savecookie', (req, res) => {
  req.session.cookies = true;  //Pasar el estado de las cookies a true

  app.locals.cookies = req.session.cookies;  //Actualizar la variable global

  res.json({message: "cookies saved"});
  console.log("COOKIES SAVED");

  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Exporta app para ser usado por bin/www
module.exports = app;
