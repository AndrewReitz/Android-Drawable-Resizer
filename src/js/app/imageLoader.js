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

define(function(require){
    'use strict';

    var AndroidAsset = require('app/androidDrawable');

    var ImageLoader = function(callback) {

        if (!callback) {
            throw new Error("callback can not be null");
        } else if (typeof(callback) !== 'function') {
            throw new TypeError("callback must be a function");
        }

        this._callback = callback;
        this._imageHolder = [];
        this._imageCount = 0;
    };

    ImageLoader.prototype.setNumberOfImages = function(numberOfImages) {
        if (!numberOfImages) {
            throw new Error("numberOfImages can not be null");
        } else if(typeof(numberOfImages) !== 'number') {
            throw new TypeError("numberOfImages must be a number");
        }

        this._numberOfImages = numberOfImages;
    };

    ImageLoader.prototype.setDensity = function(density) {
        if (!density) {
            throw new Error("density can not be null");
        } else if (typeof(density) !== 'number') {
            throw new TypeError("density must be a number");
        }

        this._density = density;
    };

    ImageLoader.prototype.loadImage = function(dataUrl, filename) {

        if (!this._density) {
            throw new Error("setDensity must be called before loadImage can be called");
        }

        if (!this._numberOfImages) {
            throw new Error("setNumberOfImages must be called before loadImage can be called");
        }

        var image = new Image();
        image.name = filename;
        this._imageHolder.push(image);
        image.onload = this._onLoadComplete.bind(this);
        image.src = dataUrl;
    };

    ImageLoader.prototype._onLoadComplete = function() {
        var androidAssets = [];
        this._imageCount = this._imageCount + 1;


        if(this._numberOfImages === this._imageCount) {
            for(var i = 0; i < this._imageHolder.length; i++) {
                var asset = new AndroidAsset(this._imageHolder[i], this._density);
                androidAssets.push(asset);
            }

            this._callback(androidAssets);
        }
    };

    return ImageLoader;
});
