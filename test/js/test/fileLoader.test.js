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

define(['app/fileLoader'], function (FileLoader) {
    'use strict';

    describe('FileLoader', function () {
        it('should callback with fileReader', function() {

            var callback = function(fileReader) {
                expect(fileReader).to.be.ok();
                expect(fileReader).to.be.a(FileReader);
            };

            var fileLoader = new FileLoader(callback);
            var file = new Blob();
            fileLoader.loadFile(file);
        });

        it('should throw error when called with wrong type', function() {
            var callback = function(fileReader) {
                expect(fileReader).to.not.be.ok();
            };

            var fileLoader = new FileLoader(callback);

            var error;
            try {
                fileLoader.loadFile({})
            } catch(e) {
                error = e;
            }
            expect(error).to.be.ok();

            try {
                fileLoader.loadFile(6)
            } catch(e) {
                error = e;
            }
            expect(error).to.be.ok();
        });
    });
});
