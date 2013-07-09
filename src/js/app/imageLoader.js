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

define(['app/androidDrawable'], function(AndroidAsset){
    'use strict';

    /**
     * Loads images into AndroidAsset
     * @param {function} callback callback that is called after all images are loaded
     * it is passed a list of AndroidAssets
     * @constructor
     */
    var ImageLoader = function(callback) {

        if (!callback) {
            throw new Error("callback must be defined");
        } else if (typeof(callback) !== 'function') {
            throw new TypeError("callback must be a function");
        }

        this._callback = callback;
        this._imageHolder = [];
        this._imageCount = 0;
    };

    /**
     * Set the number of images that are going to be loaded
     * @param {number} numberOfImages
     */
    ImageLoader.prototype.setNumberOfImages = function(numberOfImages) {
        if (!numberOfImages) {
            throw new Error("numberOfImages must be defined");
        } else if(typeof(numberOfImages) !== 'number') {
            throw new TypeError("numberOfImages must be a number");
        }

        this._numberOfImages = numberOfImages;
    };

    /**
     * Set the density of the images being passed to this ImageLoader
     * @param {number} density
     */
    ImageLoader.prototype.setDensity = function(density) {
        if (!density) {
            throw new Error("density can not be defined");
        } else if (typeof(density) !== 'number') {
            throw new TypeError("density must be a number");
        }

        this._density = density;
    };

    /**
     * Loads an image from a base64 encoded string
     * @param {string} dataUrl base64 encoded string
     * @param {string} filename name of the image
     */
    ImageLoader.prototype.loadImage = function(dataUrl, filename) {

        if (!this._density) {
            throw new Error("setDensity must be called before loadImage can be called");
        }

        if (!this._numberOfImages) {
            throw new Error("setNumberOfImages must be called before loadImage can be called");
        }

        if (!dataUrl){
            throw new Error("dataUrl must be defined");
        } else if(typeof(dataUrl) !== 'string' || dataUrl.indexOf("data:image/png") < 0) {
            throw new TypeError("dataUrl mst be a base64 encoded string");
        }

        if (!filename){
            throw new Error("filename must be defined");
        } else if(typeof(filename) !== 'string') {
            throw new TypeError("filename must be a string");
        }

        var image = new Image();
        image.name = filename;
        this._imageHolder.push(image);
        image.onload = this._onLoadComplete.bind(this);
        image.src = dataUrl;
    };

    /**
     * Callback when a image is loaded.  If all images are loaded
     * the callback that was passed to the constructor is called.
     * @private
     */
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
