'use strict';

exports.name = 'app';

exports.requires = [
	'@express',
	'@path',
	'config.env'
];

exports.activations = [
	'routes.render',
];

exports.factory = function(express, path, env) {
	var app = express();

	// use static files
	app.use(express.static(path.join(env._rootDir, '/bower_components')));
	app.use(express.static(path.join(env._rootDir, '/build')));
	app.use(express.static(path.join(env._rootDir, '/assets')));
	app.use(express.static(path.join(env._rootDir, '/src')));

	// config other

	return app;
};
