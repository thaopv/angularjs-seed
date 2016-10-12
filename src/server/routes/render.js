'use strict';

exports.name = 'routes.render';

exports.requires = [
	'@path',
	'app',
	'config.env',
];

exports.factory = function(path, app, env) {
	app.get('/', function(req, res, next) {
		res.sendFile(env._bootstrapFile);
	});
};
