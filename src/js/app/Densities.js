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

define(function(){
    'use strict';

    /**
     * Enumeration for different densities
     * These numbers should not be used for calculations
     * @type {{XHDPI: number, HDPI: number, MDPI: number}}
     */
    var Densities = {
        XHDPI: 1,
        HDPI: 0.75,
        MDPI: 0.5
    };

    Object.freeze(Densities);
    return Densities;
});
