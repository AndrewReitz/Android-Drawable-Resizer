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
        var TEST_IMAGE_STRING = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS8AAAEvCAIAAACbvNCPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAEiSURBVHhe7cEBDQAAAMKg909tDjcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAUzU1TgABMjs7EgAAAABJRU5ErkJggg==";
        var TEST_IMAGE_FILENAME = 'testname.png';

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

            it('should not throw an error if called with a number', function () {
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

            it('should not throw an error if called with a number', function () {
                expect(function () {
                    imageLoader.setDensity(1);
                }).to.not.throwError();

                expect(function () {
                    imageLoader.setDensity(10);
                }).to.not.throwError();

                expect(function () {
                    imageLoader.setDensity(100);
                }).to.not.throwError();
            });
        });

        describe('#loadImage', function () {
            var imageLoader;

            beforeEach(function () {
                imageLoader = new ImageLoader(function () {
                });
            });

            it('should throw Error if density has not been set', function () {
                var errorMessage = /setDensity must be called before loadImage can be called/;

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);
            });

            it('should throw Error if numberOfImages has not been set', function () {
                var errorMessage = /setNumberOfImages must be called before loadImage can be called/;

                imageLoader.setDensity(1);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);
            });

            it('should throw Error if dataUrl is not defined', function () {
                var errorMessage = /dataUrl must be defined/;

                imageLoader.setDensity(1);
                imageLoader.setNumberOfImages(1);

                expect(function () {
                    imageLoader.loadImage(null, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(0, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(undefined, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);
            });

            it('should throw Error if dataUrl is not a string', function () {
                var errorMessage = /dataUrl mst be a base64 encoded string/;

                imageLoader.setDensity(1);
                imageLoader.setNumberOfImages(1);

                expect(function () {
                    imageLoader.loadImage({}, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(1337, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(function () {
                    }, TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);
            });

            it('should throw Error if dataUrl is not a base64 encoded png image', function () {
                var errorMessage = /dataUrl mst be a base64 encoded string/;

                imageLoader.setDensity(1);
                imageLoader.setNumberOfImages(1);

                expect(function () {
                    imageLoader.loadImage('test', TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage('data:image/jpg', TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage('data:;', TEST_IMAGE_FILENAME);
                }).to.throwError(errorMessage);
            });

            it('should throw Error if filename is not defined', function () {
                var errorMessage = /filename must be defined/;

                imageLoader.setDensity(1);
                imageLoader.setNumberOfImages(1);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, 0);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, null);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, undefined);
                }).to.throwError(errorMessage);
            });

            it('should throw Error if filename is not a string', function () {
                var errorMessage = /filename must be a string/;

                imageLoader.setDensity(1);
                imageLoader.setNumberOfImages(1);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, 12);
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, {});
                }).to.throwError(errorMessage);

                expect(function () {
                    imageLoader.loadImage(TEST_IMAGE_STRING, function () {
                    });
                }).to.throwError(errorMessage);
            });

            it('should call callback when everything correct is passed in', function(){
                imageLoader._callback(function(stuff){
                    //TODO figure out how to make sure this is called
                    expect(stuff).to.be.ok();
                });

                imageLoader.setDensity(1);
                imageLoader.setNumberOfImages(4);

                imageLoader.loadImage(TEST_IMAGE_STRING, TEST_IMAGE_FILENAME);
            });
        });
    });
});
