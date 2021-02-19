"use strict";
exports.__esModule = true;
var express_1 = require("express");
var r = require("./routes/test-routes");
var app = express_1["default"]();
var port = 3000;
app.use("/routes/test-routes", r.router);
app.listen(port, function () {
    console.log("listening on port 3000");
});
