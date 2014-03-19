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

define(
    ['app/androidDrawable',
        'jszip/jszip.min'
    ], function (AndroidDrawable) {
        'use strict';

        /**
         * FileZipper, a class for zipping up Android Assets into a zip file
         * @constructor
         */
        var FileZipper = function () {
        };

        /**
         * Zips up all the androidAssets into their respective folders and then downloads
         * the zip file.  The folder structure is zip res/hxdpi, res/hdpi, and res/mdpi, in
         * accordance with android asset folder structure so the folders can just be
         * dropped into a project.
         * @param {Array} androidAssets an array of AndroidDrawables
         */
        FileZipper.prototype.zip = function (androidAssets) {

            if (!androidAssets) {
                throw new Error('androidAssets must be defined');
            } else if (Object.prototype.toString.call(androidAssets) !== '[object Array]') {
                throw new TypeError('androidAssets must be an array');
            }

            for (var i = 0; i < androidAssets.length; i++) {
                if (!(androidAssets[i] instanceof AndroidDrawable)) {
                    throw new Error("androidAssets must be a list of AndroidDrawables");
                }
            }

            var zip = new JSZip();
            var res = zip.folder("res");
            var xxhdpi = res.folder("drawable-xxhdpi");
            var xhdpi = res.folder("drawable-xhdpi");
            var hdpi = res.folder("drawable-hdpi");
            var mdpi = res.folder("drawable-mdpi");

            for (i = 0; i < androidAssets.length; i++) {
                var asset = androidAssets[i].getDrawable();

                //if it was a jpg, it's a png now, so rename it
                var name = asset.name.replace("jpg", "png");

                // split at the , and get the first element because of extra garbage tacked
                // onto the beginning
                xxhdpi.file(name, asset.xxhdpi.split(',')[1], {base64: true});
                xhdpi.file(name, asset.xhdpi.split(',')[1], {base64: true});
                hdpi.file(name, asset.hdpi.split(',')[1], {base64: true});
                mdpi.file(name, asset.mdpi.split(',')[1], {base64: true});
            }

            var content = zip.generate({type: "blob"});

            // hack to get element to download
            var myLink = document.createElement('a');
            document.body.appendChild(myLink);
            myLink.href = window.URL.createObjectURL(content);
            myLink.download = "AndroidAssets.zip";
            myLink.click();

            // Can't do this multiple times in a row for some odd reason
            // refresh the page so now you can
            document.location.reload(true);
        };

        return FileZipper;
    });
