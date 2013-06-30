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
                        new AndroidDrawable(new Image(), 10)
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

            it('should return a name, xhdpi, hdpi, and mdpi', function(){
                var asset = drawable.getDrawable();
                expect(asset.name).to.be.ok();
                expect(asset.xhdpi).to.be.ok();
                expect(asset.hdpi).to.be.ok();
                expect(asset.mdpi).to.be.ok();
            });

            it("name should be same as the image's name", function() {
                var asset = drawable.getDrawable();
                expect(asset.name).to.be.eql(imageName);
            });
        });
    });
});
