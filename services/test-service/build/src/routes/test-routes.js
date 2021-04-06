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
var publicToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/public.pem", { encoding: "utf8" });
var privateToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", { encoding: "utf8" });
var CreateFirebaseUser = function (email, password) {
    firebase_1.default.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) { return console.log(error); });
};
var CreateJWTWithID = function () {
    var payload_iss = "" + uuid.v4();
    var JWTResponseHeader = {
        algorithm: 'RS256',
        expiresIn: '2h'
    };
    var JWTPayload = {
        iss: payload_iss
    };
    var TokenForJWT = jwt.sign(JWTPayload, privateToken, JWTResponseHeader);
    return { token: TokenForJWT, issID: payload_iss };
};
//todo - check that email hasn't been used
var CreateConsumer = function (email, uuid) {
    axios.post('http://localhost:8001/consumers/', {
        username: "" + email
    }).then(function (response) {
        axios.post("http://localhost:8001/consumers/" + email + "/jwt/", {
            rsa_public_key: publicToken,
            algorithm: "RS256",
            key: uuid
        });
    }).catch(function (error) {
        console.log(error);
    });
};
var CreateConsumerCredentials = function (email, uuid) {
    try {
        axios.post("http://localhost:8001/consumers/" + email + "/jwt/", {
            rsa_public_key: publicToken,
            algorithm: "RS256",
            key: "" + uuid
        });
    }
    catch (error) {
        console.log(error);
    }
};
/*
* Creates a JWT token.
* Creates a firebase user instance. Token creation returns
* an object that contains a uuid used to verify an account
* on Kong Gateway consumers
*/
exports.itemrouter.get('/register', function (req, res) {
    var _a = CreateJWTWithID(), JWT = _a["token"], UserUUID = _a["issID"];
    var email = req.query.email;
    var password = req.query.password;
    CreateFirebaseUser("" + email, "" + password);
    CreateConsumer("" + email, UserUUID);
    //CreateConsumerCredentials(`${email}`, UserUUID)
    res.cookie('Clastics', JWT, {
        httpOnly: true
    });
    res.send('connection received');
    res.status(200);
});
//# sourceMappingURL=test-routes.js.map