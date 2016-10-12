'use strict';

var di = require('di-linker');

di.walk([
	'src/server/**/*.js',
], require).then(function(context) {
	return context.bootstrap(['main']);
}).catch(function error(err) {
	console.error(err);
});
