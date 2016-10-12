'use strict';

exports.name = 'config.env';
exports.requires = [
	'@lodash',
	'@path',
	'#injector',
	'config.env.defaults'
];

exports.factory = function(_, path, injector, defaults) {
	var profile = defaults._profile = process.env.NODE_ENV || 'development';

	return injector.get('config.env.' + profile).then(function(profile) {
		return _.defaultsDeep(profile, defaults);
	}).then(function(env) {
		var rootDir = path.join(__dirname, '../../../');

		env._rootDir = rootDir;
		env._bootstrapFile = path.join(rootDir, defaults.bootstrapFile);

		return env;
	});
};
