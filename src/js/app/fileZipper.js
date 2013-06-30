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

define(['jszip/jszip'], function () {
    'use strict';
    var FileZipper = function() {

    };

    FileZipper.prototype.zip = function(androidAssets) {
        var zip = new JSZip();
        var res = zip.folder("res");
        var xhdpi = res.folder("xhdpi");
        var hdpi = res.folder("hdpi");
        var mdpi = res.folder("mdpi");

        for (var i = 0; i < androidAssets.length; i++) {
            var asset = androidAssets[i].getDrawable();

            //if it was a jpg, it's a png now
            var name = asset.name.replace("jpg", "png");

            // split at the , and get the first element because of extra garbage tacked
            // onto the beginning
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

        // TODO delete mylink so that this can be run multiple times
    };

    return FileZipper;
});
