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

define(function (require) {
    'use strict';

    var InputFileHandler = require('app/inputFileHandler');

    /*
     * Function called when the dom loads from DOMContenetLoaded
     * Place code here
     */
    function ready() {
        new InputFileHandler("inputFiles");
    }

    /*
     * Unbind the dom load event listener and fire the ready event
     */
    var DOMContentLoaded = function () {
        if (document.addEventListener) {
            document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
            ready();
        } else if (document.readyState === "complete") {
            window.document.detachEvent('onreadystatechange', DOMContentLoaded);
            ready();
        }
    };

    /*
     * Add event listeners for when the dom loads fire DOMContenetLoaded
     * when it does (also checks if DOM is already loaded if it has been just fire the ready function)
     */
    if (document.readyState === 'complete') {
        setTimeout(ready, 1);
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
        window.addEventListener("load", ready, false);
    } else { //ie..
        document.attachEvent('onreadysteatechange', DOMContentLoaded);
        window.attachEvent("onload", ready);
    }
});
