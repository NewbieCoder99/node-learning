const 	crypto 	= require('crypto'),
		model 	= require('../models'),
		{ validationResult } = require('express-validator');

exports.index = function(req, res, next) {
	res.render('auth/login', { title : 'Login ' +  process.env.NODE_APP_NAME });
}

exports.login = function(req, res, next) {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({error : 1, message : errors.mapped() });
	}

	var getUser = new Promise(function(resolve) {
		model.User.findOne({
			where: {
				email : req.body.email,
				password : crypto.createHmac('sha256', process.env.NODE_APP_KEY)
					.update(req.body.password)
					.digest('hex'),
			}
		}).then(callBack => resolve(callBack))
	});

	getUser.then(function(callBack) {

		if(callBack == null) {
			res.json({
				error  : true,
				message : "User tidak ditemukan.",
				result : null
			});
		} else {
			req.session.userdata = JSON.stringify(callBack);
			res.json({
				error  	: false,
				message : "Login berhasil.",
				result 	: req.session.userdata
			});
		}
	});
}

exports.logout = function(req, res, next) {

	if(req.session.userdata) {
		req.session.userdata = null
	}

	if(req.xhr == true) {
		return res.json({
			error : 0,
			message : 'Logout successfull.'
		});
	}

	return res.redirect("/");
}