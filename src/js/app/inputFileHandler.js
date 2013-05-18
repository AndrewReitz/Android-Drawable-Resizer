/*
 *   This file is part of Android-Drawable-Resizer.
 *
 *   Android-Drawable-Resizer is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   Android-Drawable-Resizer is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with Android-Drawable-Resizer.  If not, see <http://www.gnu.org/licenses/>.
 */

define(function () {
    'use strict';

    var InputFileHandler = function(inputFilesElementId) {

        if (!inputFilesElementId) {
            throw new Error("inputFilesElementId can not be null");
        }

        this._inputImagesElement = document.getElementById(inputFilesElementId);
        this._inputImagesElement.onchange = this.onChangeHandler.bind(this);
    };

    InputFileHandler.prototype.onChangeHandler = function() {
        var inputFiles = this._inputImagesElement.files || [];

        for (var i = 0; i < inputFiles.length; i++) {
            var file = inputFiles[i];
            if (!!file.type.toLowerCase().match(/^image\//)) {
            }
        }
    };

    return InputFileHandler;
});
