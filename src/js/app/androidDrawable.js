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

define(['app/densities'], function (Densities) {
    'use strict';

    /**
     * AndroidDrawable takes in an image and the density of the image
     * to create three new images for xhdpi, hdpi, and mdpi
     * @param image Image the AndroidDrawable represents
     * @param density
     * @constructor
     */
    var AndroidDrawable = function (image, density) {

        if (!image) {
            throw new TypeError('image can not be null');
        } else if (!(image instanceof Image)) {
            throw new TypeError('image must be an Image');
        }

        this._density = density;

        var xhdpi;
        var hdpi;
        var mdpi;

        switch (density) {
            case Densities.XHDPI:
                xhdpi = this._createNewImage(image, 1);
                hdpi = this._createNewImage(image, 0.75);
                mdpi = this._createNewImage(image, 0.5);
                break;
            case Densities.HDPI:
                xhdpi = this._createNewImage(image, 1.33);
                hdpi = this._createNewImage(image, 1);
                mdpi = this._createNewImage(image, 0.66);
                break;
            case Densities.MDPI:
                xhdpi = this._createNewImage(image, 2);
                hdpi = this._createNewImage(image, 1.5);
                mdpi = this._createNewImage(image, 1);
                break;
            default:
                throw new Error('Unknown density');
        }

        this.name = image.name;
        this.xhdpi = xhdpi;
        this.hdpi = hdpi;
        this.mdpi = mdpi;
    };

    /**
     * Gets the name and resized assets as base64 encoded strings
     * @returns {{name: {string}, mdpi: {string}, hdpi: {string}, xhdpi: {string}}}
     */
    AndroidDrawable.prototype.getDrawable = function () {
        return {
            name: this.name,
            mdpi: this.mdpi,
            hdpi: this.hdpi,
            xhdpi: this.xhdpi
        };
    };

    /**
     * Takes an Image and scales it based on the scale value provided.
     * @param {Image} image Image to be resized
     * @param {Number} scale The scale up or down of the image
     * @returns {string} Base64 encoded image using toDataURL
     * @private
     */
    AndroidDrawable.prototype._createNewImage = function (image, scale) {
        var width = Math.floor(image.width * scale);
        var height = Math.floor(image.height * scale);

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);

        return canvas.toDataURL('image/png');
    };

    AndroidDrawable.prototype._createNewImageNinePatch = function (image, scale) {
        var width = image.width;
        var height = image.height;
        var newWidth = Math.floor(image.width * scale);
        var newHeight = Math.floor(image.height * scale);

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);

        var imageData = context.createImageData(
            width,
            height
        );

        // Top
        var top = [];
        for(var i = 3; i < (width * 4); i += 4) {
            if (imageData.data[i] !== 0) {
                top.push(i);
                imageData.data[i] = 0;
            }
        }

        // Bottom
        var bottom = [];
        for(var j = (height * (width - 1) * 4) -1; j < (4 * height * width); j+=4) {
            if (imageData.data[j] !== 0) {
                bottom.push(j);
                imageData.data[j] = 0;
            }
        }

        // Left
        var left = [];
        for (var k = 3; k < (height * (width - 1) * 4) -1; k += (4 * height)) {
            if (imageData.data[k] !== 0) {
                left.push(k);
                imageData.data[k] = 0;
            }
        }

        // Right
        var right = [];
        for (var l = (width * 4) - 1; l < height * width * 4; l += (4 * height)) {
            if (imageData.data[l] !== 0) {
                right.push(l);
                imageData.data[l] = 0;
            }
        }

        context.putImageData(imageData, 0, 0);

        return context.toDataURL('image/png');
    };

    return AndroidDrawable;
});
