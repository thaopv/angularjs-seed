'use strict';

var mock = {
	mockModule: function() {
		angular.mock.module('myapp');
	},
	mockConstant: function(constantName, value) {
		angular.mock.module(function($provide) {
			$provide.constant(constantName, value);
		});
	},
	mockProvider: function(providerName, value) {
		angular.mock.module(function($provide) {
			$provide.value(providerName, value);
		});
	},
	getInject: function(injectName) {
		var result;
		angular.mock.inject(function($injector) {
			result = $injector.get(injectName);
		});

		return result;
	},
};
