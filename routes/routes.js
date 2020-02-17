const dashboardPrefix = '/dashboards';

module.exports = function() {

	return {
		index : '/',
		auth : {
			login : '/auth',
			logout : '/auth/logout'
		},
		dashboards : {
			index : dashboardPrefix,
			pages : {
				user : {
					index : dashboardPrefix + '/page/users'
				}
			}
		}
	};
}