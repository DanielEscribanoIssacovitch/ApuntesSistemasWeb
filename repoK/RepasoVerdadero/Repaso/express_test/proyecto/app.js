  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  const session = require('express-session');


  var indexRouter = require('./routes/index');
  var restrictedRouter = require('./routes/restricted');
  var loginRouter = require('./routes/login');
  var cookiesRouter =  require('./routes/cookies');
  var adminRouter =  require('./routes/admin');
  var chatRouter =  require('./routes/chat');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(session({
    secret: 'your_secret_key', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: false,
  }));

  app.use((req, res, next) => {
    // Añadir la variable cookies a todas las vistas
    res.locals.cookiesAcepted = req.session.cookiesAcepted || false;
    next();
  });
  app.use('/admin', checkLogin, isAdmin, adminRouter);
  app.use('/', indexRouter);
  app.use('/restricted', checkLogin, restrictedRouter);
  app.use('/chat', checkLogin, chatRouter);
  app.use('/login', loginRouter);
  app.use('/', cookiesRouter);

  app.use('/logout', function(req, res) { 
    req.session.destroy();
    res.redirect('/');
  }
  );


  function checkLogin(req, res, next){
    if(req.session.username){
      next();
    }else{
      res.redirect('/');
    }
  };

  function isAdmin(req, res, next){
    console.log("dentro de app", req.session.username);
    console.log("dentro de app", req.session.username.role);
    if(req.session.username.role == 'admin'){
      next();
    }else{
      res.redirect("/");
    }
  }

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
