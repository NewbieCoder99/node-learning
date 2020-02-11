const routes = require('../routes/routes'),
	  routePrefix = routes()

module.exports = function(authenticatedRoutes) {
	return function (req, res, next) {

		if(authenticatedRoutes.indexOf(req.originalUrl) >= 0) {
			if(req.session.userdata == undefined || req.session.userdata == '') {
				if(req.xhr == true) {
					return res.status(403).json({
						error : 1,
						message : '403 Forbidden.'
					});
				}
				return res.redirect(routePrefix.auth.login);
			}
		}

		next();
	}
}