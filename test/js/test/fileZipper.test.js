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

define(['app/fileZipper', 'app/androidDrawable'], function (FileZipper) {
    'use strict';

    describe('FileZipper', function () {

        describe('#Constructor', function () {
            it('should be ok', function () {
                var fileZipper = new FileZipper();
                expect(fileZipper).to.be.ok();
            });
        });

        describe('#zip', function () {
            var fileZipper = new FileZipper();

            it('should throw error if androidAssets are not defined', function () {
                var message = /androidAssets must be defined/;
                expect(function () {
                    fileZipper.zip(null);
                }).to.throwError(message);
            });

            it('should throw error if androidAssets is not an Array', function () {
                var message = /androidAssets must be an array/;
                expect(function () {
                    fileZipper.zip(1);
                }).to.throwError(message);

                expect(function () {
                    fileZipper.zip('test');
                }).to.throwError(message);

                expect(function () {
                    fileZipper.zip({});
                }).to.throwError(message);
            });

            it('should throw error if androidAssets is an Array that is not empty and does not contain an AndroidDrawable',
                function () {
                    var message = /androidAssets must be a list of AndroidDrawables/;
                    expect(function () {
                        fileZipper.zip(['a', 'b', 'c']);
                    }).to.throwError(message);

                    expect(function () {
                        fileZipper.zip([1, 2, 3]);
                    }).to.throwError(message);

                    expect(function () {
                        fileZipper.zip([
                            {},
                            {},
                            {}
                        ]);
                    }).to.throwError(message);
                });
        });
    });
});
