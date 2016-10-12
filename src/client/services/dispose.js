;(function() {
	'use strict';

	angular.module('myapp').factory('/services/dispose', [
		'@lodash',
		function(_) {
			var self = {};

			self.array = function(arr, disposeLogic) {
				_.forEach(arr, function(element, index) {
					if (!element) {
						return;
					}

					if (disposeLogic) {
						disposeLogic(element);
					}

					arr[index] = undefined;
				});
			};

			self.event = function(arr) {
				if (!arr) {
					return;
				}

				_.forEach(arr, function(off) {
					off();
				});

				arr.length = 0;
			};

			return self;
		}
	]);
})();
