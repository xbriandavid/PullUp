"use strict";
exports.__esModule = true;
var express_1 = require("express");
var API_Gateway = express_1["default"]();
API_Gateway.listen(3000, function () {
    console.log("API_GATEWAY");
});
