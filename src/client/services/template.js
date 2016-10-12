;(function() {
	'use strict';

	angular.module('myapp').constant('/services/template', function(template) {
		return '/client/views/' + template + '.tpl.html';
	});

	angular.module('myapp').constant('/services/partial', function(partial) {
		return '/client/components/' + partial + '.tpl.html';
	});
})();
