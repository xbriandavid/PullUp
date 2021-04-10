"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = __importDefault(require("express"));
var firebase_1 = __importDefault(require("firebase"));
exports.AuthRouter = express_1.default.Router();
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var axios = require('axios');
var publicToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/public.pem", { encoding: "utf8" });
var privateToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", { encoding: "utf8" });
var AuthenticationErrors = {
    EmailNotRegistered: "auth/user-not-found",
    PasswordUnkown: "auth/wrong-password",
    EmptyStringError: "auth/empty-string",
    GenericError: "auth/gen-error",
};
var NonNullCredentials = function (email, password) {
    var NonNullInputs = (email != null) && (password != null);
    var stringEmail = "" + email;
    var stringPassword = "" + password;
    var NonEmptyStrings = (stringEmail.length > 0) && (stringPassword.length > 0);
    console.log(NonNullInputs);
    console.log(NonEmptyStrings);
    return NonNullInputs && NonEmptyStrings;
};
var CreateFirebaseUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebase_1.default.auth().createUserWithEmailAndPassword(email, password)
                    .catch(function (error) { return console.log(error); })
                // Verify that email has not been used
            ];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var LogFirebaseUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebase_1.default.auth().signInWithEmailAndPassword("" + email, "" + password)
                    .then(function (credentials) {
                    return credentials;
                })
                    .catch(function (error) {
                    return error;
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var HandleValidCredentials = function (LoginResult) {
    var _a = CreateJWTWithID(), JWT = _a["token"], UserUUID = _a["issID"];
    if (LoginResult.user != null) {
        AddJWTForConsumer("" + LoginResult.user.email, UserUUID);
        return { Result: true, ReturnValue: JWT };
    }
    else {
        return { Result: false, ReturnValue: AuthenticationErrors.GenericError };
    }
};
var HandleInvalidCredentials = function (LoginResult) {
    if (LoginResult.code == AuthenticationErrors.EmailNotRegistered || LoginResult.code == AuthenticationErrors.PasswordUnkown) {
        return { ReturnValue: LoginResult.code };
    }
    else {
        return { ReturnValue: AuthenticationErrors.GenericError };
    }
};
/*
*  Returns an object containing a JWT and an ID
*  that maps the registered/logged account for a
*  Kong consumer object
*/
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
/*
*  Calls Kong Gateway API to create a consumer object along
*  with a subsequent call to assign the consumer with a JWT
*/
var CreateConsumer = function (email, uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.post('http://localhost:8001/consumers/', {
                        username: "" + email
                    })];
            case 1:
                _a.sent();
                AddJWTForConsumer(email, uuid);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var AddJWTForConsumer = function (email, uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.post("http://localhost:8001/consumers/" + email + "/jwt/", {
                        rsa_public_key: publicToken,
                        algorithm: "RS256",
                        key: uuid
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2 == firebase_1.default);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
*  Endpoint to register a user on firebase and
*  consumer object ceation for kong supplmented
*  with a JWT
*/
exports.AuthRouter.post('/register', function (req, res) {
    var _a = CreateJWTWithID(), JWT = _a["token"], UserUUID = _a["issID"];
    var email = req.query.email;
    var password = req.query.password;
    CreateFirebaseUser("" + email, "" + password);
    CreateConsumer("" + email, UserUUID);
    res.cookie('Clastics', JWT, {
        httpOnly: true
    });
    res.send('connection received');
    res.status(200);
});
/*
*  Endpoint to log user in and return cookie
*  with JWT
*/
exports.AuthRouter.get('/login', function (req, res) {
    if (NonNullCredentials(req.query.email, req.query.password)) {
        LogFirebaseUser("" + req.query.email, "" + req.query.password)
            .then(function (LoginResult) {
            if ('user' in LoginResult) {
                var _a = HandleValidCredentials(LoginResult), Result = _a.Result, ReturnValue = _a.ReturnValue;
                if (Result) {
                    res.cookie('Clastics', ReturnValue, {
                        httpOnly: true
                    });
                    res.send("Completed");
                }
                else {
                    res.send(ReturnValue);
                }
            }
            else {
                res.send(HandleInvalidCredentials(LoginResult).ReturnValue);
            }
        });
    }
    else {
        res.send(AuthenticationErrors.EmptyStringError);
    }
    res.status(200);
});
//# sourceMappingURL=auth-routes.js.map