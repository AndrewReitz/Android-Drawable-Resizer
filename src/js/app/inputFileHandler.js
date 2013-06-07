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

define(function () {
    'use strict';

    var InputFileHandler = function(inputFilesElement, fileLoadedCallback) {

        if (!inputFilesElement) {
            throw new Error("inputFilesElement can not be null");
        } else if (inputFilesElement.type !== 'file') {
            throw new Error("inputFilesElement type must be of type file");
        }

        if (!fileLoadedCallback) {
            throw new Error("fileLoadedCallback is missing");
        } else if (typeof(fileLoadedCallback) !== 'function') {
            throw new Error("fileLoadedCallback must be a function");
        }

        this._inputImagesElement = inputFilesElement;
        this._inputImagesElement.onchange = this._onChangeHandler.bind(this);
        this._fileLoadedCallback = fileLoadedCallback;
    };

    InputFileHandler.prototype._onChangeHandler = function() {
        var inputFiles = this._inputImagesElement.files || [];

        for (var i = 0; i < inputFiles.length; i++) {
            this._fileLoadedCallback(inputFiles[i]);
        }
    };

    return InputFileHandler;
});
