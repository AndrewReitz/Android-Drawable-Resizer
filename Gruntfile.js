module.exports = function (grunt) {
    'use strict';

    // Files to watch and run jshint on
    var files = ['Gruntfile.js', 'src/js/**/*.js'];

    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: files,
                tasks: ['jshint']
            }
        },
        jshint: {
            grunt: {
                src: [ "Gruntfile.js" ],
                options: {
                    jshintrc: ".jshintrc"
                }
            },
            src: {
                src: [ 'src/js/*.js', 'src/js/app/*.js' ],
                options: {
                    jshintrc: "src/js/.jshintrc"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['jshint']);
};
