"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
exports.router = express_1["default"].Router();
exports.router.get('/', function (req, res) {
    res.send("this is the response!!");
});
