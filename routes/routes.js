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
					index : dashboardPrefix + '/page/users',
					create : dashboardPrefix + '/page/users/create',
					store : dashboardPrefix + '/page/users/store',
					edit : dashboardPrefix + '/page/users/edit',
					update : dashboardPrefix + '/page/users/update',
					destroy : dashboardPrefix + '/page/users/destroy',
				}
			}
		}
	}
}