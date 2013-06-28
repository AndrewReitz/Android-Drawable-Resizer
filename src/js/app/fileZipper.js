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

define(['jszip'], function () {
    'use strict';

    var FileZipper = function() {

    };

    FileZipper.prototype.zip = function() {
        var zip = new JSZip();
        var res = zip.folder("res");
        var xhdpi = res.folder("xhdpi");
        var hdpi = res.folder("hdpi");
        var mdpi = res.folder("mdpi");

        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            var name = image.name.replace("jpg", "png");

            xhdpi.file(name, image.xhdpi.split(',')[1], {base64: true});
            hdpi.file(name, image.hdpi.split(',')[1], {base64: true});
            mdpi.file(name, image.mdpi.split(',')[1], {base64: true});
        }

        var content = zip.generate({type: "blob"});

        var myLink = document.createElement('a');
        document.body.appendChild(myLink);
        myLink.href = window.URL.createObjectURL(content);
        myLink.download = "AndroidAssets.zip";
        myLink.click();
    };

    return FileZipper;
});
