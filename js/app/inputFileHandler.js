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

    var InputFileHandler = function (
        inputFilesElement,
        imageDensityElement,
        resizeAssetsOnClickedElement,
        fileLoadedCallback,
        imageLoader
        ) {

        if (!inputFilesElement) {
            throw new Error("inputFilesElement can not be null");
        } else if (inputFilesElement.type !== 'file') {
            throw new Error("inputFilesElement type must be of type file");
        }

        if (!imageDensityElement) {
            throw new Error("imageTypeElement can not be null");
        } else if (imageDensityElement.type !== 'select-one') {
            throw new Error("imageTypeElement type must be of type select-one");
        }

        if (!resizeAssetsOnClickedElement) {
            throw new Error("resizeOnClickedElement must not be null");
        }

        if (!fileLoadedCallback) {
            throw new Error("fileLoadedCallback is missing");
        } else if (typeof(fileLoadedCallback) !== 'function') {
            throw new Error("fileLoadedCallback must be a function");
        }

        if (imageLoader && !(imageLoader instanceof(ImageLoader))) {
            throw new TypeError("imageLoader must be an instance of ImageLoader");
        }

        this._imageDensityElement = imageDensityElement;
        this._imageLoader = imageLoader;
        this._inputImagesElement = inputFilesElement;
        this._resizeOnClickedElement = resizeAssetsOnClickedElement;
        this._resizeOnClickedElement.onclick = this._onClickHandler.bind(this);
        this._fileLoadedCallback = fileLoadedCallback;
    };

    InputFileHandler.prototype._onClickHandler = function () {
        var inputFiles = this._inputImagesElement.files || [];
        var density = Densities[this._imageDensityElement.value];

        this._imageLoader.setDensity(density);
        this._imageLoader.setNumberOfImages(inputFiles.length);

        for (var i = 0; i < inputFiles.length; i++) {
            this._fileLoadedCallback(inputFiles[i]);
        }
    };

    return InputFileHandler;
});
