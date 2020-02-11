'use-strict'

const 	express = require('express'),
		router = express.Router(),
		authController = require('../controllers/authController'),
		userController = require('../controllers/userController'),
		{ check } = require('express-validator'),
		routes = require('../routes/routes'),
		routePrefix = routes()

router

	/*
	* Index Route
	*/
	.get(routePrefix.index, function(req, res, next) {
		res.render('index', { title : process.env.NODE_APP_NAME })
	})

	/*
	* Auth Routes
	*/
	.get(routePrefix.auth.login, authController.index)
	.post(routePrefix.auth.login, [
		check('email','Email is required.').not().isEmpty(),
		check('email','Invalid email format.').isEmail(),
		check('password', 'Password is required.').not().isEmpty(),
  	], authController.login)
  	.get(routePrefix.auth.logout, authController.logout)

	/*
	* User Dashboard Routes
	*/
	.get(routePrefix.dashboards.users.index, userController.index)

module.exports = router;
