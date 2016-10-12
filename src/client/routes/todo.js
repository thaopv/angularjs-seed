;(function() {
	'use strict';

	angular.module('myapp').config([
		'$routeProvider',
		'/services/template',
		function($routeProvider, template) {
			$routeProvider.when('/todo', {
				controller: '/controllers/todo/list',
				templateUrl: template('todo/list'),
			});
		},
	]);
})();
