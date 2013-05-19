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

    var FileLoader = function (fileLoadedCallback) {
        this._fileLoadedCallback = fileLoadedCallback;
        this._fileReader = new FileReader();
    };

    FileReader.prototype.loadFile = function (file) {
        this._fileReader.onload = this._fileReaderLoaded.bind(this);
        this._fileReader.readAsDataURL(file);
    };

    FileLoader.prototype._fileReaderLoaded = function () {
        this._fileLoadedCallback(this._fileReader);
    };

    return FileLoader;
});
