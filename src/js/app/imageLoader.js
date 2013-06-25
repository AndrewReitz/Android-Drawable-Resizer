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

define(function(){
    'use strict';

    var ImageLoader = function(numberOfImages) {

        if (numberOfImages) {
            throw new Error("numberOfImages can not be null");
        } else if(typeof(numberOfImages) !== 'number') {
            throw new TypeError("numberOfImages must be a number");
        }

        this._numberOfImages = numberOfImages;
        this._androidAssets = [];
    };

    ImageLoader.prototype.loadImage = function(dataUrl, density) {
        this._image = new Image();
        this._image.src = dataUrl;

        this._density = density;
    };

    ImageLoader.prototype._onLoadComplete = function() {

    };

    return ImageLoader;
});
