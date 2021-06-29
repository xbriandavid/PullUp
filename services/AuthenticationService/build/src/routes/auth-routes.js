"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = __importDefault(require("express"));
var firebase_authenticator_1 = require("./firebase-authenticator");
exports.AuthRouter = express_1.default.Router();
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var publicToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/AuthenticationService/src/public.pem", { encoding: "utf8" });
var privateToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/AuthenticationService/src/private.pem", { encoding: "utf8" });
var AuthenticationErrors = {
    EmailNotRegistered: "auth/user-not-found",
    PasswordUnkown: "auth/wrong-password",
    EmptyStringError: "auth/empty-string",
    Registration_InvalidEmail: "auth/invalid-email",
    Registration_WeakPassword: "auth/weak-password",
    GenericError: "auth/gen-error",
};
var AuthSuccess = {
    Success: "auth/successful"
};
var NonNullCredentials = function (email, password) {
    var NonNullInputs = (email != null) && (password != null);
    var NonEmptyStrings = (("" + email).length > 0) && (("" + password).length > 0);
    return NonNullInputs && NonEmptyStrings;
};
exports.AuthRouter.post('/register', function (req, res) {
    if (!NonNullCredentials(req.query.email, req.query.password)) {
        res.json({
            result: true,
            msg: AuthSuccess.Success
        });
    }
    firebase_authenticator_1.RegisterFirebaseUser("" + req.query.email, "" + req.query.password)
        .then(function (credentials) {
        res.json({
            result: true,
            msg: AuthSuccess.Success
        });
    })
        .catch(function (AuthError) {
        res.json({
            result: false,
            msg: AuthError.code
        });
    });
});
exports.AuthRouter.get('/login', function (req, res) {
    if (!NonNullCredentials(req.query.email, req.query.password)) {
        res.json({
            result: false,
            msg: AuthenticationErrors.EmptyStringError
        });
        res.send(AuthenticationErrors.EmptyStringError);
    }
    firebase_authenticator_1.LogFirebaseUser("" + req.query.email, "" + req.query.password)
        .then(function (credentials) {
        res.json({
            result: true,
            msg: AuthSuccess.Success
        });
    })
        .catch(function (AuthError) {
        res.json({
            result: false,
            msg: AuthError.code
        });
    });
});
//# sourceMappingURL=auth-routes.js.map