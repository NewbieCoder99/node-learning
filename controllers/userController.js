exports.index = function(req, res, next) {
	res.render('users/index', {
		title : process.env.NODE_APP_NAME + ' Users',
		sess : JSON.parse(req.session.userdata)
	});
}
