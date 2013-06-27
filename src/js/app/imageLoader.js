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

    var AndroidAsset = require('app/androidAsset');

    var ImageLoader = function(density, numberOfImages) {

        if (density) {
            throw new Error("density can not be null");
        } else if (typeof(density) !== 'number') {
            throw new TypeError("density must be a number");
        }

        if (numberOfImages) {
            throw new Error("numberOfImages can not be null");
        } else if(typeof(numberOfImages) !== 'number') {
            throw new TypeError("numberOfImages must be a number");
        }

        this._numberOfImages = numberOfImages;
        //TODO make the size of numberOfImages;
        this._androidAssets = [];
    };

    ImageLoader.prototype.loadImage = function(dataUrl) {
        //TODO load each image calling onLoadComplete
        //passing all the images to an array
        //TODO make another array in constructor
        var image = new Image();
        image = this._onLoadComplete();
        image.src = dataUrl;
    };

    ImageLoader.prototype._onLoadComplete = function() {
        //TODO check to see all images are loaded, if they are loop
        // through them, convert them to androidasset then call a callback to notify they are all completed
    };

    return ImageLoader;
});
