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

define(['app/inputFileHandler'], function (InputFileHandler) {
    'use strict';

    describe('InputFileHandler', function() {
        it('should call callback once per file', function() {
            var element = document.createElement('input');
            element.type = 'file';

            var callback = function() {

            };

            var inputFIleHandler = new InputFileHandler();

            inputFIleHandler._inputImagesElement.files = [];
        });
    });
});
