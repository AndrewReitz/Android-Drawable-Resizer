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

define(['app/imageLoader', 'app/densities'], function (ImageLoader, Densities) {
    'use strict';

    var InputFileHandler = function (inputFilesElement, imageTypeElement, fileLoadedCallback, imageLoader) {

        if (!inputFilesElement) {
            throw new Error("inputFilesElement can not be null");
        } else if (inputFilesElement.type !== 'file') {
            throw new Error("inputFilesElement type must be of type file");
        }

        if (!imageTypeElement) {
            throw new Error("imageTypeElement can not be null");
        } else if (imageTypeElement.type !== 'select-one') {
            throw new Error("imageTypeElement type must be of type select-one");
        }

        if (!fileLoadedCallback) {
            throw new Error("fileLoadedCallback is missing");
        } else if (typeof(fileLoadedCallback) !== 'function') {
            throw new Error("fileLoadedCallback must be a function");
        }

        if (imageLoader && !(imageLoader instanceof(ImageLoader))) {
            throw new TypeError("imageLoader must be an instance of ImageLoader");
        }

        this._imageLoader = imageLoader;
        this._inputImagesElement = inputFilesElement;
        this._inputImagesElement.onchange = this._onChangeHandler.bind(this);
        this._fileLoadedCallback = fileLoadedCallback;
    };

    InputFileHandler.prototype._onChangeHandler = function () {
        var inputFiles = this._inputImagesElement.files || [];

        // TODO get density from drop down
        this._imageLoader.setDensity(Densities.XHDPI);
        this._imageLoader.setNumberOfImages(inputFiles.length);

        for (var i = 0; i < inputFiles.length; i++) {
            this._fileLoadedCallback(inputFiles[i]);
        }
    };

    return InputFileHandler;
});
