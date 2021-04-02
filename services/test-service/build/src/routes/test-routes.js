"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemrouter = void 0;
var express_1 = __importDefault(require("express"));
var firebase_1 = __importDefault(require("firebase"));
exports.itemrouter = express_1.default.Router();
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var admin = require('firebase-admin');
var cookieParser = require('cookie-parser');
var privateTok = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", { encoding: "utf8" });
// JWT Creation method
var CreateJWT = function () {
    var JWTResponseHeader = {
        algorithm: 'RS256',
        expiresIn: '2h'
    };
    var JWTPayload = {
        iss: "" + uuid.v4()
    };
    var token = jwt.sign(JWTPayload, privateTok, JWTResponseHeader);
    return token;
};
// Callback to create a Firebase user
var CreateFirebaseUser = function (email, password) {
    firebase_1.default.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) { return console.log(error); });
};
exports.itemrouter.get('/register', function (req, res) {
    res.send(CreateJWT());
    res.status(200);
});
//# sourceMappingURL=test-routes.js.map