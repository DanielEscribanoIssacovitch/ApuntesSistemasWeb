const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const tiendaRouter = require('./routes/tienda');
const restrictedRouter = require('./routes/restricted');
const chatRouter = require('./routes/chat');
const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users');
const scoresRouter = require('./routes/scores');
const gameRouter = require('./routes/game');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "Embutidos León";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Una frase muy secreta",
  resave: false,
  saveUninitialized: true,
  consentCookie: false
}));
app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message) res.locals.message = `<p>${message}</p>`;
  if(error) res.locals.error = `<p>${error}</p>`;

  //ESTO ES LO QUE SE HA CAMBIADO EN LA ÚLTIMA VERSIÓN
  res.locals.cookie = req.session.consentCookie || false;
  next();
});

const database = require('./database');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/tienda', tiendaRouter);
app.use('/restricted', restricted, restrictedRouter);
app.use('/chat', chatRouter);
app.use('/register', registerRouter);
app.use("/users", usersRouter);
app.use('/scores', scoresRouter);
app.use('/game', gameRouter);
app.use('/logout', (req,res) =>{
  database.user.deletecookies(req.session.user.username);
  req.session.destroy();
  res.redirect("/");
});

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}

app.post('/savecookies', (req, res, next) => {
  req.session.consentCookie = true;

  if(req.session.user){
    database.user.savecookies(req.session.user.username);
    console.log("SAVE IN DATABASE");
  }

  res.json({ success: true });
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

module.exports = app;
