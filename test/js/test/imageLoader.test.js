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

define(['app/imageLoader'], function (ImageLoader) {
    'use strict';

    describe('ImageLoader', function () {
        describe('#Constructor', function () {
            it('should throw Error if callback is not defined', function () {
                var erroMessage = /callback must be defined/;
                expect(function () {
                    new ImageLoader(null);
                }).to.throwError(erroMessage);

                expect(function () {
                    new ImageLoader(undefined);
                }).to.throwError(erroMessage);

                expect(function () {
                    new ImageLoader(0);
                }).to.throwError(erroMessage);
            });

            it('should throw an Error if callback is not a function', function () {
                var errorMessage = /callback must be a function/;
                expect(function () {
                    new ImageLoader(1);
                }).to.throwError(errorMessage);

                expect(function () {
                    new ImageLoader('string');
                }).to.throwError(errorMessage);

                expect(function () {
                    new ImageLoader({});
                }).to.throwError(errorMessage);
            });
        });

        describe('#setNumberOfImages', function () {
            var imageLoader = new ImageLoader(function () {
            });

            it('should throw an Error if numberOfImages is not defined', function () {
                var errorMessage = /numberOfImages must be defined/;

                expect(function () {
                    imageLoader.setNumberOfImages(null);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setNumberOfImages(undefined);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setNumberOfImages(0);
                }).to.throwError(errorMessage);
            });

            it('should throw an Error if numberOfImages is not a number', function () {
                var errorMessage = /numberOfImages must be a number/;

                expect(function () {
                    imageLoader.setNumberOfImages({});
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setNumberOfImages('string');
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setNumberOfImages(function () {
                    });
                }).to.throwError(errorMessage);
            });

            it('should not throw an error if called with a number', function(){
                expect(function () {
                    imageLoader.setNumberOfImages(1);
                }).to.not.throwError();

                expect(function () {
                    imageLoader.setNumberOfImages(10);
                }).to.not.throwError();

                expect(function () {
                    imageLoader.setNumberOfImages(100);
                }).to.not.throwError();
            });
        });
        describe('#setDensity', function () {
            var imageLoader = new ImageLoader(function () {
            });

            it('should throw an Error if density is not defined', function () {
                var errorMessage = /density can not be defined/;

                expect(function () {
                    imageLoader.setDensity(0);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setDensity(null);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setDensity(undefined);
                }).to.throwError(errorMessage);
            });

            it('should throw an Error is density is not a number', function () {
                var errorMessage = /density must be a number/;

                expect(function () {
                    imageLoader.setDensity({});
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setDensity('string');
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.setDensity(function () {
                    });
                }).to.throwError(errorMessage);
            });

            it('should not throw an error if called with a number', function(){
                expect(function(){
                    imageLoader.setDensity(1);
                }).to.not.throwError();

                expect(function(){
                    imageLoader.setDensity(10);
                }).to.not.throwError();

                expect(function(){
                    imageLoader.setDensity(100);
                }).to.not.throwError();
            });
        });


    });
});
