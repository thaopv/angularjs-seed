;(function() {
	'use strict';

	angular.module('myapp', [
		'import',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'pascalprecht.translate',
	]).config([
		'$routeProvider',
		'/services/template',
		function($routeProvider, template) {
			$routeProvider.when('/', {
				controller: '/controllers/dashboard',
				templateUrl: template('dashboard'),
			}).otherwise({
				redirectTo: '/',
			});
		},
	]).config([
		'$translateProvider',
		function($translateProvider) {
			$translateProvider.useSanitizeValueStrategy('escapeParameters');
		},
	]);
})();
