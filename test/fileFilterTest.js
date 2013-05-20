var assert = require("assert");
var path = require("path");
var requirejs = require("requirejs");
var should = require("should");

requirejs.config({
    baseUrl: path.normalize(path.join(__dirname, "../js")),
    nodeRequire: require
});

describe("FileFilter Test", function () {
    var FileFilter = requirejs(path.normalize(path.join(__dirname, "../js/app/fileFilter")));
});
