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

define(['app/androidDrawable', 'app/densities'], function (AndroidDrawable, Densities) {
    'use strict';

    describe('AndroidDrawable', function() {

        describe('#Constructor', function(){
            it('should throw a TypeError if not an image', function() {
                expect(
                    function() {
                        new AndroidDrawable({}, Densities.XHDPI);
                    }).to.throwError(function(e) {
                        expect(e).to.be.a(TypeError);
                    });
            });

            it('should throw a TypeError if null', function() {
                expect(
                    function() {
                        new AndroidDrawable(null, Densities.XHDPI);
                    }).to.throwError(function(e) {
                        expect(e).to.be.a(TypeError);
                    });
            });

            it('should throw an Error if density is not a valid density', function() {
                expect(
                    function() {
                        new AndroidDrawable(new Image(), 10);
                    }
                ).to.throwError();
            });
        });

        describe('#getDrawable', function(){
            var drawable;
            var imageName = 'testImage';

            beforeEach(function(){
                var image = new Image();
                image.name = imageName;
                drawable = new AndroidDrawable(image, Densities.XHDPI);
            });

            it('should return name, xhdpi, hdpi, and mdpi', function(){
                var asset = drawable.getDrawable();
                expect(asset.name).to.be.ok();
                expect(asset.xhdpi).to.be.ok();
                expect(asset.hdpi).to.be.ok();
                expect(asset.mdpi).to.be.ok();
            });

            it('xhdpi, hdpi, and mdpi should return base64 encoded image', function() {
                var asset = drawable.getDrawable();
                expect(asset.xhdpi).to.be.a('string');
                expect(asset.xhdpi).to.contain('data:');

                expect(asset.hdpi).to.be.a('string');
                expect(asset.hdpi).to.contain('data:');

                expect(asset.mdpi).to.be.a('string');
                expect(asset.mdpi).to.contain('data:');
            });

            it("name should be same as the image's name", function() {
                var asset = drawable.getDrawable();
                expect(asset.name).to.be.eql(imageName);
            });
        });

        describe('#_createNewImage', function() {
            var testImageString = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS8AAAEvCAIAAACbvNCPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAEiSURBVHhe7cEBDQAAAMKg909tDjcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAUzU1TgABMjs7EgAAAABJRU5ErkJggg==";
            var imageSize = 300;
            var drawable;
            var image;
            beforeEach(function(){
                image = new Image();
                image.src = testImageString;
                image.height = imageSize;
                image.width = imageSize;

                drawable = new AndroidDrawable(new Image(), Densities.XHDPI);
            });

            it('scale of 1 should return the same height and width that was passed in', function(done){
                var imgSrc = drawable._createNewImage(image, 1);
                var img = new Image();
                img.onload = function() {
                    expect(this.width).to.be(imageSize);
                    expect(this.height).to.be(imageSize);
                    done();
                };
                img.src = imgSrc;
            });

            it('scale of 0.5 should return the half the height and width that was passed int', function(done){
                var imgSrc = drawable._createNewImage(image, 0.5);
                var img = new Image();
                img.onload = function() {
                    expect(this.width).to.be(imageSize * 0.5);
                    expect(this.height).to.be(imageSize * 0.5);
                    done();
                };
                img.src = imgSrc;
            });

            it('scale of 2 should return double the original height and width that was passed in', function(done){
                var imgSrc = drawable._createNewImage(image, 2);
                var img = new Image();
                img.onload = function() {
                    expect(this.width).to.be(imageSize * 2);
                    expect(this.height).to.be(imageSize * 2);
                    done();
                };
                img.src = imgSrc;
            });
        });
    });
});
