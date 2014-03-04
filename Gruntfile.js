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

    // Project configuration.
    grunt.initConfig({
        watch: {
            livereload: {
                files: ['src/*', 'src/**/*', '!**/lib/**'],
                tasks: ['htmllint', 'jslint'],
                options: {
                    livereload: true
                }
            }
        },
        htmllint: {
            all: ["src/index.html"]
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
        connect: {
            server: {
                options: {
                    port: 8888,
                    base: 'src',
                    keepalive: true,
                    hostname: '127.0.0.1',
                    livereload: true
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['connect', 'watch', 'open:connect'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        clean: {
            build: [
                "dist/css",
                "dist/fonts",
                "dist/images",
                "dist/lib",
                "dist/index.html"
            ]
        },
        open: {
            connect: {
                path: 'http://127.0.0.1:8888',
                app: 'google-chrome'
            },
            file: {
                path: 'src/index.html',
                app: 'google-chrome'
            },
            release: {
                path: 'http://andrewreitz.com/Android-Drawable-Resizer/',
                app: 'google-chrome'
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "src/js/main.js",
                    appDir: "src",
                    baseUrl: "js",
                    dir: "dist",
                    modules: [
                        {
                            name: "main"
                        }
                    ]
                }
            }
        },
        copy: {
            release: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/'
            }
        },
        githubPages: {
            target: {
                options: {
                    // The default commit message for the gh-pages branch
                    commitMessage: 'pushing updates'
                },
                // The folder where your gh-pages repo is
                src: 'dist'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-github-pages');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-html');

    // Default task
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('dev', 'Runs all dev commands, if your are developing you want this', 'concurrent:target');

    grunt.registerTask('release', 'Creates the release build and publishes it to github pages',
        [
            'clean:build',
            'copy:release',
            'deploy'
        ]
    );

    grunt.registerTask('deploy', ['githubPages:target']);
};
