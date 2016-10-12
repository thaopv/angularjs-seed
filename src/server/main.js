'use strict';

exports.name = 'main';

exports.requires = [
	'app',
	'config.env.defaults',
];

exports.factory = function(app, defaults) {
	var server = app.listen(defaults.port, function() {
		var host = server.address().address;
		var port = server.address().port;

		console.log('app listening at http://%s:%s', host, port);
	});

	return server;
};
