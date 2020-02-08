const 	createError = require('http-errors'),
		express = require('express'),
		path = require('path'),
		cookieParser = require('cookie-parser'),
		logger = require('morgan'),
		expressSession = require('express-session'),
		app = express(),

		indexRouter = require('./routes/index'),
		usersRouter = require('./routes/users'),
		authRouter = require('./routes/auth');

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(expressSession({
	secret : process.env.NODE_APP_KEY,
	saveUninitialized: false,
	resave : false
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', authRouter);

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
