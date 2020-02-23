'use strict';

const model = require('../../models');
const datatable = require(`sequelize-datatable`);
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const routes = require('../../routes/routes'),
	  routePrefix = routes()

exports.index = function(req, res, next) {

	if(!req.xhr) {
		return res.render('dashboard/user/index', {
			title : 'Users'
		});
	}

	/*
	* Sequelize Datatable
	*/
	datatable(model.User, req.query, {
		// Todo
	}).then((result) => {
		res.json(result);
	});
}

exports.create = function(req, res, next) {
	return res.render('dashboard/user/create', {
		title : 'Create User'
	});
}

exports.store = function(req, res, next) {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({error : 1, message : errors.mapped() });
	}

	/*
	* Create User With Promise
	*/
	var createUser = new Promise(function(resolve) {
		model.User.create({
			username : req.body.username,
			email : req.body.email,
			password : crypto.createHmac('sha256', process.env.NODE_APP_KEY).update(req.body.password).digest('hex')
		}).then(callBack => 
			resolve(callBack)
		).catch(function (err) {
			res.json({
				error  	: true,
				message : err.message,
				redirect : false,
			});
		});
	});

	createUser.then(function(callBack) {
		res.json({
			error  	: false,
			message : "User was created.",
			redirect : req.body.redirect,
		});
	});
}

exports.edit = function(req, res, next) {
	model.User.findOne({
		where: {
			id : req.params.id
		}
	}).then(callBack => 
		res.render('dashboard/user/edit', {
			title : 'Edit User',
			data : callBack,
			id : req.params.id
		})
	);
}

exports.update = function(req, res, next) {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({error : 1, message : errors.mapped() });
	}

	var updateUser = new Promise(function(resolve) {
		if(req.body.password != '') {
			var data = {
				username : req.body.username,
				email : req.body.email,
				password : crypto.createHmac('sha256', process.env.NODE_APP_KEY).update(req.body.password).digest('hex')
			}
		} else {
			var data = {
				username : req.body.username,
				email : req.body.email
			}
		}
		model.User.update(data, {
			where : {
				id : req.params.id
			}
		}).then(callback => {
			res.json({
				error  	: false,
				message : "User was updated.",
				redirect : req.body.redirect,
			});
		});
	});
}

exports.show = function(req, res, next) {
	return res.render('dashboard/user/show', {
		title : 'Users'
	});
}

exports.destroy = function(req, res, next) {
	model.User.destroy({
		where : {
			id : req.params.id
		}
	}).then(callback => {
		res.redirect(routePrefix.dashboards.pages.user.index);
	});
}