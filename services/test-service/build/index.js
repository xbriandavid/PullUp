"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_routes_1 = require("./routes/test-routes");
var app = express_1.default();
var port = 8000;
app.use("/", test_routes_1.itemrouter);
app.listen(port, function () {
    console.log("listening on port 8000");
});
//# sourceMappingURL=index.js.map