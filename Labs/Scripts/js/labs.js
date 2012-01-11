﻿/**
* Global namespace.
*/
var Labs = Labs || {};

$(document).ready(function () {
    Labs.localStorage.initialise();
});

/**
* Returns true if supplied keycode is relevant for typing. Used with keyup events to prevent firing on shift, windows key, alt etc
*/
Labs.typingKeycode = function (keyCode) {
    return (keyCode == 8 || keyCode == 13 || keyCode == 46 || (keyCode > 48 && keyCode < 90) || (keyCode > 96 && keyCode < 105))
};

var t;

Labs.callbackTimeout = function (callback) {
    clearTimeout(t);
    t = setTimeout(callback, 500);
};