"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_routes_1 = require("./routes/auth-routes");
var express_openid_connect_1 = require("express-openid-connect");
var config_1 = require("../config");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var dotenv = require('dotenv');
dotenv.config();
app.use(cors_1.default());
app.use(express_openid_connect_1.auth(config_1.environmentConfig['CROSS-ORIGIN-CONFIG']));
app.use('/auth', auth_routes_1.AuthRouter);
app.listen(3000, function () {
    console.log("Sever now running...");
});
//# sourceMappingURL=index.js.map