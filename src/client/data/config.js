;(function() {
	'use strict';

	angular.module('myapp').constant('/data/config', {
		api: {
			rootPath: 'htt://google.com/api/',
		},
		path: {
			deploy: 'project-base/',
		},
		timer: {
			timeout: 1000,
		},
		validation: {
			specials: /([^a-zA-Z0-9_-\s])/i,
			spaces: /([\s])+/i,
		},
	});
})();
