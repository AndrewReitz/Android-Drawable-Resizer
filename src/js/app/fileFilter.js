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
     * FileFilter filter files against a regular expression and call the call back with them
     * @param {RegExp} fileTypeRegex Regular Expression to check file against
     * @param {function} fileMatchedCallback callback that is called when a file is found to match
     * the regular expression
     * @constructor
     */
    var FileFilter = function (fileTypeRegex, fileMatchedCallback) {

        if (!fileTypeRegex) {
            throw new Error("fileTypeRegex must be defined");
        } else if (!(fileTypeRegex instanceof RegExp)) {
            throw new Error("fileTypeRegex must be type of RegExp");
        }

        if (!fileMatchedCallback) {
            throw new Error("fileMatchedCallback must be defined");
        } else if (typeof(fileMatchedCallback) !== 'function') {
            throw new Error("fileMatchedCallback must be a function");
        }

        this._fileTypeRegex = fileTypeRegex;
        this._fileMatchedCallback = fileMatchedCallback;
    };

    /**
     * Checks a file against the regular expression that was passed in to the constructor.
     * If a file matches the callback passed into the constructor is called
     * @param file {File} file to be checked against the regular expression
     */
    FileFilter.prototype.checkFile = function (file) {
        if (!file) {
            throw new Error("file must be defined");
        } else if (!(file instanceof Blob)) {
            throw new Error("file must be an instance of Blob");
        }

        if (!!file.type.toLowerCase().match(this._fileTypeRegex)) {
            this._fileMatchedCallback(file);
        }
    };

    return FileFilter;
});
