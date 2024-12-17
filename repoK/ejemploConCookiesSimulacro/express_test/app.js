var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var restrictedRouter = require('./routes/restricted');
const cookiesRoutes = require('./routes/cookies');

var app = express();

//titulo harcodeado
app.locals.title = "Titulo Prueba";



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'Your_Secret_Key', //clave para firmar cookie inicio de sesion
   resave: false, //false: la sesion no se guarda si no ha sido modificada, true, guarda sesion e cada solicitud
  saveUninitialized: false}//false: solo e guarda cuando hay algin dato que almacenar, true, guardas sesiones no inicializadas(no tienen datos)
))

app.use((req, res, next) => {
  res.locals.cookiesAccepted = req.session.cookiesAccepted || false;
  next();
});
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restricted', checkLogin, restrictedRouter);

app.use("/", cookiesRoutes);




app.use('/logout', (req, res) => {
  
    req.session.destroy();
    res.redirect('/');
});

function checkLogin(req, res, next){
  if(req.session.username){
    next();
  }else{
    res.redirect('/login');
  }
};




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

module.exports = app;
