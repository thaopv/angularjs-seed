;(function() {
	'use strict';

	angular.module('import', [])
			.constant('@lodash', window._)
			.constant('@jquery', window.jQuery);
})();
