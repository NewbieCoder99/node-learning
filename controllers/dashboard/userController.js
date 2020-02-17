'use strict';

const model = require('../../models');
const datatable = require(`sequelize-datatable`);

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
