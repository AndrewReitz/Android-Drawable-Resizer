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

    var FileFilter = function (fileTypeRegex, fileMatchedCallback) {

        if(!fileTypeRegex) {
            throw new Error("fileTypeRegex must be defined");
        } else if (!(fileTypeRegex instanceof RegExp)) {
            throw new Error("fileTypeRegex must be type of RegExp");
        }

        if (!fileMatchedCallback) {
            throw new Error("fileMatchedCallback must be defined");
        } else if(typeof(fileMatchedCallback) !== 'function') {
            throw new Error("fileMatchedCallback must be a function");
        }

        this._fileTypeRegex = fileTypeRegex;
        this._fileMatchedCallback = fileMatchedCallback;
    };

    FileFilter.prototype.checkFile = function (file) {
        if (!!file.type.toLowerCase().match(this._fileTypeRegex)) {
            this._fileMatchedCallback(file);
        }
    };
});
