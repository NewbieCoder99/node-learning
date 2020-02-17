exports.index = function(req, res, next) {
	res.render('dashboard/index', {
		title : 'Dashboard'
	});
}
