const 	createError = require('http-errors'),
		express = require('express'),
		path = require('path'),
		cookieParser = require('cookie-parser'),
		logger = require('morgan'),
		expressSession = require('express-session'),
		app = express(),

		authenticatedMiddleware = require('./middleware/authenticatedMiddleware'),
		routes = require('./routes/routes'),
		routePrefix = routes(),
		webRouter = require('./routes/web')
		require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(expressSession({
	secret : process.env.NODE_APP_KEY,
	saveUninitialized: false,
	resave : false
}))
app.use(function (req, res, next) {
	res.locals.route = routePrefix
	next()
})

/*
* Authenticated Routes
*/
const authenticatedRoutes = [
	routePrefix.dashboards.users.index
];
app.use(authenticatedMiddleware(authenticatedRoutes))
app.use('/', webRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app;
