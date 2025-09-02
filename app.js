var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//! importing express-session
const expressSession=require('express-session')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//*user file to use kar rhe h
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//! using express-session(This will allow the session for storing)
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"kucj bhi likho"
}))

//! Adding Passport code
app.use(passport.initialize()); //?-->passport ko bta rhe he ki abb tumhara kaam ki jarurat h

app.use(passport.session());//todo isse session store hota h //?--> passport ko session me store kar payega server pe

passport.serializeUser(usersRouter.serializeUser());//?user file se communicate kar rhe or passport pe various checking ho rhi
passport.deserializeUser(usersRouter.deserializeUser());
//todo----------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
