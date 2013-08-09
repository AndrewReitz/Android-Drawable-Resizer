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

    var fs = require('fs');
    var path = require('path');

    var FILES = ['Gruntfile.js', 'src/**/*', 'test/**/*'];

    /**
     * Build folder name
     * @type {string}
     */
    var BUILD_OUTPUT_FOLDER = 'Release';

    /**
     * Removes a directory and all files from the file system
     * @param {string} dirPath path that it and it's dependents should be removed from
     * @param {Array} fileFilters array of string that are compared to a filename, if a file
     * matches this string if will not be removed
     */
    var rmDir = function (dirPath, fileFilters) {

        fileFilters = fileFilters || [];

        if (!fs.existsSync(dirPath)) {
            return;
        }

        var wasFiltered = false;
        var filtered = false;
        var files = fs.readdirSync(dirPath);
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                //check if file is filtered if it is don't delete it
                for (var j = 0; j < fileFilters.length; j++) {
                    if (file === fileFilters[j]) {
                        filtered = true;
                    }
                }

                var filePath = path.join(dirPath, file);
                var isFile = fs.statSync(filePath).isFile();
                if (isFile && !filtered) {
                    console.log("deleting file ", file);
                    fs.unlinkSync(filePath);
                }
                else if (!isFile) {
                    rmDir(filePath, fileFilters);
                }

                if (filtered) {
                    wasFiltered = true;
                    filtered = false;
                }
            }
        }

        // If a file was filtered skip deleting the directory
        if (!wasFiltered) {
            fs.rmdirSync(dirPath);
        }
    };

    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: FILES,
                tasks: ['build']
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
                    mainConfigFile: "src/js/main.js",
                    appDir: "src",
                    baseUrl: "js",
                    dir: BUILD_OUTPUT_FOLDER,
                    modules: [
                        {
                            name: "main"
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task
    grunt.registerTask('default', ['jshint']);

    // Build task
    grunt.registerTask('build', 'creates a release build', [
        'build-init',
        'jshint',
        'requirejs',
        'build-post'
    ]);

    grunt.registerTask('build-init', function () {
        console.log('Building Android-Drawable-Resizer...');

        // remove any files in lib/requirejs that isn't the require.js file
        // otherwise there are issues when trying to copy and minify
        rmDir('src/js/lib/requirejs', ['require.js']);

        if (!fs.existsSync(BUILD_OUTPUT_FOLDER)) {
            fs.mkdirSync(BUILD_OUTPUT_FOLDER);
        }
    });

    grunt.registerTask('build-post', function () {
        console.log('\nbuild complete!');
    });

    grunt.registerTask('clean', 'clean the build folder', function () {
        rmDir(BUILD_OUTPUT_FOLDER);
    });
};
