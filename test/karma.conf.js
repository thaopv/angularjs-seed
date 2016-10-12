module.exports = function(config) {
	config.set({
		basePath: '../',
		files: [
			"bower_components/jquery/dist/jquery.min.js",
			"bower_components/lodash/dist/lodash.min.js",
			"bower_components/angular/angular.min.js",
			"bower_components/angular-resource/angular-resource.min.js",
			"bower_components/angular-sanitize/angular-sanitize.min.js",
			"bower_components/angular-route/angular-route.min.js",
			"bower_components/angular-translate/angular-translate.min.js",
			'bower_components/angular-mocks/angular-mocks.js',
			"src/client/main.js",
			"src/client/**/*.js",
			'test/client/**/*.js',
		],
		frameworks: [
			'jasmine',
		],
		browsers: [
			'PhantomJS',
		],
		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-coverage',
		],
		reporters: [
			'dots',
			'junit',
			'coverage',
		],
		junitReporter : {
			outputDir: 'test/report',
			suite: 'unit',
		},
		coverageReporter: {
			type: 'html',
			dir: 'test/coverage',
			subdir: '.',
		},
		preprocessors: {
			'src/**/*.js': 'coverage',
		},
	});
};
