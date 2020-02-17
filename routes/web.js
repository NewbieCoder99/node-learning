'use-strict'

const 	express = require('express'),
		router = express.Router(),
		authController = require('../controllers/authController'),
		dashboardController = require('../controllers/dashboard/dashboardController'),
		userController = require('../controllers/dashboard/userController'),
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
	* Dashboard Routes
	* ===============================================
	*/
	.get(routePrefix.dashboards.index, dashboardController.index)

	/*
	* Dashboard Routes
	* ===============================================
	* Page Name : users
	*/
	.get(routePrefix.dashboards.pages.user.index, userController.index)

module.exports = router;
