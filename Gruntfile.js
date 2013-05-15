module.exports = function(grunt) {

	// Files to watch and run jshint on
	var files = ['Gruntfile.js', 'js/*.js'];

	// Project configuration.
	grunt.initConfig({
		watch: {
			scripts: {
				files: files,
				tasks: ['jshint']
			}
		},
		jshint: {
			files: files
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['jshint']);
};
