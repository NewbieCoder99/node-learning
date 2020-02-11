module.exports = function() {
	return {
		index : '/',
		auth : {
			login : '/auth',
			logout : '/auth/logout'
		},
		dashboards : {
			users : {
				index : '/user',
			}
		}
	};
}