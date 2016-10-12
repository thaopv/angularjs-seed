;(function() {
	'use strict';

	angular.module('myapp').factory('/services/querystring', [
		'@lodash',
		function(_) {
			return function(parameters) {
				var querystring = [];

				_.forEach(parameters, function(value, key) {
					var param = key + '=' + value;

					querystring.push(param);
				});

				querystring = querystring.join('&');

				return '?' + querystring;
			};
		}
	]);
})();
