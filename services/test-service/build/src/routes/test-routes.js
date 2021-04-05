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
var axios = require('axios');
var privateTok = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", { encoding: "utf8" });
// JWT Creation method
var CreateJWTWithID = function () {
    var payload_iss = "" + uuid.v4();
    var JWTResponseHeader = {
        algorithm: 'RS256',
        expiresIn: '2h'
    };
    var JWTPayload = {
        iss: payload_iss
    };
    var TokenForJWT = jwt.sign(JWTPayload, privateTok, JWTResponseHeader);
    return { token: TokenForJWT, issID: payload_iss };
};
// Creating a consumer object for Kong Gateway
var CreateConsumer = function (email) {
    //
    // Create object
    // use uiid
};
// Callback to create a Firebase user
var CreateFirebaseUser = function (email, password) {
    firebase_1.default.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) { return console.log(error); });
};
exports.itemrouter.get('/register', function (req, res) {
    var email = req.query.email;
    var password = req.query.password;
    CreateFirebaseUser("" + email, "" + password);
    res.send("connection received.\nYour email: " + email);
    res.status(200);
});
exports.itemrouter.post('/makeCustomer', function (req, res) {
    try {
        axios.post('http://localhost:8001/consumers/', {
            username: "testusername"
        });
    }
    catch (error) {
        console.log(error);
    }
    res.send("request completed");
    res.status(200);
});
//# sourceMappingURL=test-routes.js.map