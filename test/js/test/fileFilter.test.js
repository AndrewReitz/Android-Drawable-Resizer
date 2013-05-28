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
        var fileFilterImage;
        var fileFilterText;
        var callbackFile;

        var mimeText = { 'type': 'text\/plain'};
        var mimeImagePng = { 'type': 'image\/png'};
        var mimeImageJpg = { 'type': 'image\/jpeg' };
        var mimeXml = { 'type': 'text\/xml' };

        beforeEach(function (done) {

            var callback = function (file) {
                if (file != null) {
                    callbackFile = file;
                    done();
                }

                throw new Error('file should not be null');
            };

            fileFilterImage = new FileFilter(/^image\//, callback);
            fileFilterText = new FileFilter(/text\/plain/, callback);
            done();
        });

        it('should not call callback when mime type does not match', function () {
            var fileXml = new Blob([], mimeXml);
            fileFilterImage.checkFile(file);
            expect(callbackFile).to.not.be.ok();

            callbackFile = null;
            file = new Blob([], mimeText);
            fileFilterImage.checkFile(file);
            expect(callbackFile).to.not.be.ok();

            callbackFile = null;
            file = new Blob([], mimeText);
            fileFilterText.checkFile(file);
            expect(callbackFile).to.not.be.ok();
        });

        it('should call callback when mime type matches', function() {
            var file = new Blob([], mimeImageJpg);
            fileFilterImage.checkFile(file);
            expect(callbackFile).to.be.ok();

            callbackFile = null;
            file = new Blob([], mimeImagePng);
            fileFilterImage.checkFile(file);
            expect(callbackFile).to.be.ok();

            callbackFile = null;
            file = new Blob([], mimeImagePng);
            fileFilterImage.checkFile(file);
            expect(callbackFile).to.be.ok();
        });
    });
});
