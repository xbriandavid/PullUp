"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemrouter = void 0;
var express_1 = __importDefault(require("express"));
exports.itemrouter = express_1.default.Router();
exports.itemrouter.get('/', function (req, res) {
    res.send("this is the response!!");
});
//# sourceMappingURL=test-routes.js.map