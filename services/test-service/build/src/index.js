"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_routes_1 = require("./routes/test-routes");
var express_openid_connect_1 = require("express-openid-connect");
var config_1 = require("../config");
var cors_1 = __importDefault(require("cors"));
var firebase_1 = __importDefault(require("firebase"));
var admin = __importStar(require("firebase-admin"));
var app = express_1.default();
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var privateTok = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", { encoding: "utf8" });
dotenv.config();
admin.initializeApp({ credential: admin.credential.cert(config_1.environmentConfig["FIREBASE-ADMIN-CONFIG"]) });
firebase_1.default.initializeApp(config_1.environmentConfig['FIREBASE-CONFIG']);
app.use(cors_1.default());
app.use(cookieParser());
app.use(express_openid_connect_1.auth(config_1.environmentConfig['CROSS-ORIGIN-CONFIG']));
app.use('/auth', test_routes_1.itemrouter);
app.listen(3000, function () {
    console.log("listening on port 3000");
});
//# sourceMappingURL=index.js.map