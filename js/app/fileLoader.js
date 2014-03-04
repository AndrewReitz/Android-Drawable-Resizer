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

    /**
     * Class for loading files into a FileReader
     * @param {function} fileLoadedCallback callback to be
     * called after loadFile is called
     * @constructor
     */
    var FileLoader = function (fileLoadedCallback) {
        if (!fileLoadedCallback) {
            throw new Error("fileLoadedCallback must be defined");
        } else if (typeof(fileLoadedCallback) !== 'function') {
            throw new Error("fileLoadedCallback must be a function");
        }

        this._fileLoadedCallback = fileLoadedCallback;
    };

    /**
     * Loads a file into a FileReader and calls the callback passed into
     * the constructor with the result and the fileName
     * @param {File} file File to be loaded
     */
    FileLoader.prototype.loadFile = function (file) {
        if (!file) {
            throw new Error("file must be defined");
        } else if (!(file instanceof Blob)) {
            throw new Error("file must be and instance of Blob");
        }

        var fileReader = new FileReader();
        fileReader.onload = this._fileReaderLoaded.bind(
            {
                fileName: file.name,
                callback: this._fileLoadedCallback,
                fileReader: fileReader
            });
        fileReader.readAsDataURL(file);
    };

    /**
     * callback for when the fileReader onload function is
     * called.  Calls the callback that was passed in in the
     * constructor.
     * @private
     */
    FileLoader.prototype._fileReaderLoaded = function () {
        this.callback(this.fileReader.result, this.fileName);
    };

    return FileLoader;
});
