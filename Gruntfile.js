'use strict';
var _ = require('lodash');
var path = require('path');

var assets = require('./assets/assets.json');
var js = {};
_.forEach(assets.js, function(define) {
	js[define.dest] = _.concat(assets.plugins, define.src);
});

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			json: 'build/*.json',
			tmp: 'build/.tmp',
			js: 'build/js',
			css: 'build/css',
			font: 'build/font',
			img: 'build/img',
			html: 'build/html',
		},
		jscs: {
			options: {
				config: 'rules/.jscsrc',
			},
			server: {
				src: [
					'index.js',
					'src/server/**/*.js',
					'Gruntfile.js',
				],
			},
			client: {
				src: [
					'src/client/**/*.js',
				],
			},
		},
		jshint: {
			client: {
				options: {
					jshintrc: 'rules/.jshintrc-client',
				},
				src: '<%= jscs.client.src %>',
			},
			server: {
				options: {
					jshintrc: 'rules/.jshintrc-server',
				},
				src: '<%= jscs.server.src %>',
			},
		},
		stylus: {
			options: {
				use: [
					require('kouto-swiss'),
				],
				compress: false,
			},
			prod: {
				files: [{
					cwd: 'src/client/stylus',
					src: [
						'**/*.styl',
						'!**/_*.styl',
					],
					dest: 'build/.tmp/css',
					ext: '.css',
					expand: true,
				}],
			},
			dev: {
				files: [{
					cwd: 'src/client/stylus',
					src: [
						'**/*.styl',
						'!**/_*.styl',
					],
					dest: 'build/css',
					ext: '.css',
					expand: true,
				}],
			},
		},
		copy: {
			html: {
				files: [{
					cwd: assets.copy.html.cwd,
					src: assets.copy.html.src,
					dest: assets.copy.html.dest,
					expand: true,
				}],
			},
			font: {
				files: [{
					cwd: 'assets/font',
					src: [
						'**/*',
					],
					dest: 'build/font',
					expand: true,
				}],
			},
			img: {
				files: [{
					cwd: 'assets/img',
					src: [
						'**/*',
						'!.gitinclude',
					],
					dest: 'build/img',
					expand: true,
				}],
			},
			css: {
				options: {
					process: function(content) {
						var rev = grunt.filerev.summary;
						var originFile;
						var revFile;
						var regex;

						_.forEach(rev, function(revPath, originPath) {
							originFile = path.basename(originPath);
							revFile = path.basename(revPath);
							regex = new RegExp(originFile, 'g');

							content = content.replace(regex, revFile);
						});

						return content;
					},
				},
				files: [{
					cwd: 'build/.tmp/css',
					src: [
						'**/*.css'
					],
					dest: 'build/.tmp/css',
					expand: true
				}],
			},
			fontawesome: {
				files: [{
					cwd: './node_modules/font-awesome-stylus/fonts',
					src: [
						'**/*',
					],
					dest: 'build/fonts',
					expand: true,
				}],
			},
		},
		ngtemplates: {
			html: {
				options: {
					prefix: '/',
					module: 'myapp',
					htmlmin: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true,
						removeEmptyAttributes: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
					},
				},
				src: [
					'src/client/**/*.tpl.html',
				],
				dest: 'build/.tmp/js/_html.js',
			},
		},
		uglify: {
			options: {
				compress: {
					// drop_console: true,
					drop_console: false,
				},
			},
			prod: {
				files: js
			},
		},
		concat: {
			options: {
				separator: ';\n',
			},
			prod: {
				files: js,
			},
		},
		imagemin: {
			prod: {
				files: [{
					cwd: 'assets/img',
					src: [
						'**/*.*',
					],
					dest: 'build/.tmp/img',
					expand: true,
				}],
			},
		},
		filerev: {
			img: {
				files: [{
					cwd: 'build/.tmp/img',
					src: [
						'**/*'
					],
					dest: 'build/img',
					expand: true,
				}],
			},
			css: {
				files: [{
					cwd: 'build/.tmp/css_min',
					src: [
						'**/*.css',
					],
					dest: 'build/css',
					expand: true,
				}],
			},
			js: {
				files: [{
					cwd: 'build/.tmp/js_min',
					src: [
						'**/*.js',
					],
					dest: 'build/js',
					expand: true,
				}],
			},
		},
		csssplit: {
			prod: {
				options: {
					suffix: '.',
				},
				files: [{
					cwd: 'build/.tmp/css',
					src: [
						'**/*.css',
					],
					dest: 'build/.tmp/css_split',
					expand: true,
				}],
			},
		},
		cssmin: {
			prod: {
				files: [{
					cwd: 'build/.tmp/css_split',
					src: [
						'**/*.css',
					],
					dest: 'build/.tmp/css_min',
					expand: true,
				}],
			},
		},
		jsonAngularTranslate: {
			prod: {
				options: {
					moduleName: 'myapp',
				},
				files: [{
					expand: true,
					cwd: 'assets/translates',
					src: '*.json',
					dest: 'build/.tmp/js',
					ext: '.js',
				}],
			},
		},
		injector: {
			options: {
				template: 'src/client/views/main.html',
				ignorePath: [
					'build',
					'src',
					'bower_components',
				],
			},
			build: {
				files: {
					'build/html/main.html': [
						'build/**/*.css',
						'build/**/*.js',
					],
				},
			},
			dev: {
				files: {
					'build/html/main.html': _.concat(assets.plugins, [
						'src/client/main.js',
						'src/client/**/*.js',
						'build/**/*.css',
					]),
				},
			},
		},
		karma: {
			options: {
				configFile: 'test/karma.conf.js',
			},
			unit: {
				singleRun: false,
			},
			deploy: {
				singleRun: true,
			},
		},
		develop: {
			dev: {
				file: './index.js',
			},
		},
		watch: {
			options: {
				spawn: false,
			},
			client: {
				files: [
					'<%= jshint.client.src %>',
				],
				tasks: [
					'jscs:client',
					'jshint:client',
					'copy:html',
					'injector:dev',
					'develop:dev',
				],
			},
			server: {
				files: '<%= jscs.server.src %>',
				tasks: [
					'jscs:server',
					'jshint:server',
					'develop:dev',
				],
			},
			style: {
				files: [
					'src/client/stylus/**/*.styl',
				],
				tasks: [
					'clean:css',
					'stylus:dev',
					'injector:dev',
					'develop:dev',
				],
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:html',
		'clean:css',
		'static',
		'stylus:dev',
		'copy:html',
		'injector:dev',
		'develop:dev',
		'watch',
	]);

	grunt.registerTask('static', [
		'jscs',
		'jshint',
	]);

	grunt.registerTask('test', [
		'karma',
	]);

	grunt.registerTask('build', [
		'karma:deploy',
		'clean',
		'copy:font',
		'copy:fontawesome',
		'imagemin:prod',
		'filerev:img',
		'stylus:prod',
		'copy:css',
		'copy:html',
		'csssplit:prod',
		'cssmin:prod',
		'filerev:css',
		'jsonAngularTranslate:prod',
		'ngtemplates:html',
		'uglify:prod',
		'filerev:js',
		'injector:build',
		'clean:tmp',
	]);
};
