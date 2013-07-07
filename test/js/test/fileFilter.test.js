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

define(['app/fileFilter'], function (FileFilter) {
    'use strict';

    describe('FileFilter', function () {
        describe('#Constructor', function () {
            var callback = function () {
            };

            it('should throw Error if fileTypeRegex is not defined', function () {
                expect(function () {
                    var temp;
                    new FileFilter(temp, callback);
                }).to.throwError();

                expect(function () {
                    new FileFilter(null, callback);
                }).to.throwError();

                expect(function () {
                    new FileFilter(undefined, callback);
                });
            });

            it('should throw a TypeError if fileTypeRegex is not a RegExp', function () {
                expect(function () {
                    new FileFilter({}, callback);
                }).to.throwException(function (e) {
                        expect(e).to.be.a(TypeError);
                    });
            });
        });

        describe('#checkFile', function () {
            var mimeText = { 'type': 'text\/plain'};
            var mimeImagePng = { 'type': 'image\/png'};
            var mimeImageJpg = { 'type': 'image\/jpeg' };
            var mimeXml = { 'type': 'text\/xml' };

            it('should not call callback when mime type does not match', function () {

                var callback = function (file) {
                    expect(file).to.not.be.ok();
                };

                var fileFilterImage = new FileFilter(/^image\//, callback);
                var fileFilterText = new FileFilter(/text\/plain/, callback);

                var fileXml = new Blob([], mimeXml);
                fileFilterImage.checkFile(fileXml);

                var fileText = new Blob([], mimeText);
                fileFilterImage.checkFile(fileText);

                var fileJpg = new Blob([], mimeImageJpg);
                fileFilterText.checkFile(fileJpg);
            });

            it('should call callback when mime type matches', function () {
                var callback = function (file) {
                    expect(file).to.be.ok();
                    expect(file).to.be.a(Blob);
                };

                var fileFilterImage = new FileFilter(/^image\//, callback);
                var fileFilterText = new FileFilter(/text\/plain/, callback);

                var fileJpg = new Blob([], mimeImageJpg);
                fileFilterImage.checkFile(fileJpg);

                var filePng = new Blob([], mimeImagePng);
                fileFilterImage.checkFile(filePng);

                var fileText = new Blob([], mimeText);
                fileFilterText.checkFile(fileText);
            });
        });
    });
});
