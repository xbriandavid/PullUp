"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemrouter = void 0;
var express_1 = __importDefault(require("express"));
exports.itemrouter = express_1.default.Router();
exports.itemrouter.get('/', function (req, res) {
    res.json({
        payload: 30,
        payload2: 50
    });
});
//# sourceMappingURL=test-routes.js.map