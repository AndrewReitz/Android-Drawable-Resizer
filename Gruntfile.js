/*
 * This file is part of Android-Drawable-Resizer.
 *
 * Android-Drawable-Resizer is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details.
 *
 */

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
                src: [ 'Gruntfile.js' ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            src: {
                src: [ 'src/js/*.js', 'src/js/app/*.js' ],
                options: {
                    jshintrc: 'src/js/.jshintrc'
                }
            },
            test: {
                src: [ 'test/js/*.js', 'test/js/test/*.js' ],
                options: {
                    jshintrc: 'test/js/.jshintrc'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/js/',
                    paths: {
                        jszip: "lib/jszip"
                    },
                    name: "main",
                    out: 'optimized.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task
    grunt.registerTask('default', ['jshint']);
};
