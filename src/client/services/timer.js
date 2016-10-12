;(function() {
	'use strict';

	angular.module('myapp').factory('/services/timer', [
		'/data/config',
		function(config) {
			var firstTime = new Date();

			var executable = function(timeout) {
				var currentTime = new Date();
				var timeDelay = Math.abs(currentTime - firstTime);

				// update time for time last active
				firstTime = currentTime;

				return timeDelay >= timeout;
			};

			var delayExecute = (function() {
				var timer = 0;
				return function(callback, ms) {
					clearTimeout(timer);
					timer = setTimeout(callback, ms);
				};
			})();

			return {
				executable: function(timeout) {
					return executable(timeout);
				},
				calTimeout: function(timeout) {
					var timer = 0;

					if (!executable(timeout)) {
						timer = timeout;
					}

					return timer;
				},
				delayExecute: function(cb, ms) {
					delayExecute(cb, ms);
				},
			};
		},
	]);
})();
