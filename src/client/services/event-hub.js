;(function() {
	'use strict';

	angular.module('myapp').factory('/services/event-hub', [
		'/services/event-emitter',
		function(EventEmitter) {
			return new EventEmitter();
		},
	]);
})();
