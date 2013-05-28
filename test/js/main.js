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

require.config({
    baseUrl: 'js/',
    paths: {
        node_modules: "../../node_modules/",
        app: "../../src/js/app"
    }
});

requirejs(["node_modules/mocha/mocha",
    'node_modules/expect.js/expect'],
    function () {
        'use strict';
        mocha.setup('bdd');

        require([
            'test/fileFilter.test'
        ], function () {
            mocha.run();
        });
    });
