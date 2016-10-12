;(function() {
	'use strict';

	angular.module('myapp').factory('/services/api', [
		'/data/config',
		function(config) {
			return function(api) {
				return config.api.rootPath + api;
			};
		},
	]);
})();
