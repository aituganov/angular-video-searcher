module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dev: [
				"src/directives/**/*.css"
			],
			all: [ 'dist/tmp/', 'node_modules'],
			build: [ 'dist/runtime/', 'dist/build/'],
			runtime: [ 'dist/runtime/', 'dist/tmp' ]
		},

		copy: {
			main: {
				files: [
					// includes files within path and its sub-directories
					{expand: true, cwd: 'src/', src: ['img/**', 'fonts/**'], dest: 'dist/'},
					{expand: true, src: ['bower_components/**'], dest: 'dist/'},

					// flattens results to a single level
					{expand: true, cwd: 'src/', src: ['index.min.html'], dest: 'dist/',rename: function(dest, src) {
						return dest + src.replace(/\min.html$/, "html");
					}},
				],
			},
		},

		jshint: {
			files: [ 'Gruntfile.js', 'src/*.js', 'src/**/*.js', '!src/bower_components/**' ],
			options: {
				"expr": true
			}
		},

		ngtemplates: {
			Jenova: {
				src: ['src/directives/**/*.html'],
				dest: 'dist/tmp/templates.js',
				options: {
					url: function (url) {
						return url.replace('src/', '');
					}
				}
			}
		},

		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"dist/app.css": "src/app.less"
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['src/**/*.js', 'dist/tmp/templates.js', '!src/bower_components/**'],
				dest: 'dist/app.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Test task
	grunt.registerTask('test', ['jshint']);

	// this would be run by typing "grunt build" on the command line
	grunt.registerTask('build', ['clean:build', 'copy', 'ngtemplates', 'less', 'uglify', 'clean:runtime']);

	// Default task(s).
	grunt.registerTask('default', ['test', 'build']);
};