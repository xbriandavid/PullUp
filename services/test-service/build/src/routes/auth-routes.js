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
    Registration_InvalidEmail: "auth/invalid-email",
    Registration_WeakPassword: "auth/weak-password",
    GenericError: "auth/gen-error",
};
var AuthSuccess = {
    Success: "auth/successful"
};
// 'auth/email-already-in-use'
var NonNullCredentials = function (email, password) {
    var NonNullInputs = (email != null) && (password != null);
    var NonEmptyStrings = (("" + email).length > 0) && (("" + password).length > 0);
    return NonNullInputs && NonEmptyStrings;
};
// turn into try and catch !
var CreateFirebaseUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var a;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebase_1.default.auth().createUserWithEmailAndPassword(email, password)
                    .then(function (response) {
                    return response;
                })
                    .catch(function (error) {
                    return error;
                })];
            case 1:
                a = _a.sent();
                return [2 /*return*/, a];
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
var CreateConsumer = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post('http://localhost:8001/consumers/', {
                    username: "" + email
                })
                    .then(function (response) {
                    return true;
                }).catch(function (response) {
                    return false;
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var AddJWTForConsumer = function (email, uuid) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.post("http://localhost:8001/consumers/" + email + "/jwt/", {
                    rsa_public_key: publicToken,
                    algorithm: "RS256",
                    key: uuid
                }).then(function (response) {
                    return true;
                }).catch(function (response) {
                    return false;
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var ValidateNewAccount = function (email, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, JWT, UserUUID, ValidateCreateConsumer, ValidateJWTForConsumer;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = CreateJWTWithID(), JWT = _a["token"], UserUUID = _a["issID"];
                return [4 /*yield*/, CreateConsumer("" + email)
                        .then(function (CreateSuccess) {
                        if (!(CreateSuccess)) {
                            return { result: AuthenticationErrors.GenericError };
                        }
                        return { result: JWT };
                    })];
            case 1:
                ValidateCreateConsumer = _b.sent();
                if (ValidateCreateConsumer['result'] == AuthenticationErrors.GenericError) {
                    return [2 /*return*/, { result: AuthenticationErrors.GenericError }];
                }
                return [4 /*yield*/, AddJWTForConsumer("" + email, UserUUID)
                        .then(function (JWTSuccess) {
                        if (!(JWTSuccess)) {
                            return { result: AuthenticationErrors.GenericError };
                        }
                        return { result: JWT };
                    })
                        .catch(function (e) {
                        return { result: e };
                    })];
            case 2:
                ValidateJWTForConsumer = _b.sent();
                if (ValidateJWTForConsumer['result'] != JWT) {
                    return [2 /*return*/, { result: AuthenticationErrors.GenericError }];
                }
                else {
                    return [2 /*return*/, { result: ValidateJWTForConsumer['result'] }];
                }
                return [2 /*return*/];
        }
    });
}); };
var ValidateExistingAccount = function (email, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, JWT, UserUUID, ValidateLogin;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = CreateJWTWithID(), JWT = _a["token"], UserUUID = _a["issID"];
                return [4 /*yield*/, AddJWTForConsumer("" + email, UserUUID)
                        .then(function (JWTSuccess) {
                        if (!(JWTSuccess)) {
                            return { result: AuthenticationErrors.GenericError };
                        }
                        return { result: JWT };
                    })
                        .catch(function (e) {
                        return { result: e };
                    })];
            case 1:
                ValidateLogin = _b.sent();
                return [2 /*return*/, ValidateLogin];
        }
    });
}); };
var ValidateAccount = function (email, password, res) { return __awaiter(void 0, void 0, void 0, function () {
    var FirebaseSuccess, KongVerifyUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, LogFirebaseUser("" + email, "" + password)
                    .then(function (result) {
                    if (!('user' in result)) {
                        return { result: false, msg: result['code'] };
                    }
                    return { result: true, msg: "success" };
                })
                    .catch(function (result) {
                    return { result: false, msg: AuthenticationErrors.GenericError };
                })];
            case 1:
                FirebaseSuccess = _a.sent();
                if (!(FirebaseSuccess['result'])) {
                    res.send(FirebaseSuccess['msg']);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, ValidateExistingAccount("" + email, res)
                        .then(function (result) {
                        if (result['result'] == AuthenticationErrors.GenericError) {
                            return { result: false, msg: AuthenticationErrors.GenericError };
                        }
                        res.cookie('Clastics', result['result'], {
                            httpOnly: true
                        });
                        res.send(AuthSuccess.Success);
                        return { result: true, msg: "success" };
                    })
                        .catch(function () {
                        return { result: false, msg: AuthenticationErrors.GenericError };
                    })];
            case 2:
                KongVerifyUser = _a.sent();
                if (!(KongVerifyUser['result'])) {
                    return [2 /*return*/, KongVerifyUser['msg']];
                }
                return [2 /*return*/];
        }
    });
}); };
var CreateAccount = function (email, password, res) { return __awaiter(void 0, void 0, void 0, function () {
    var FirebaseSuccess, KongUserAddSuccess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CreateFirebaseUser("" + email, "" + password)
                    .then(function (result) {
                    if (!('user' in result)) {
                        return { result: false, msg: result['code'] };
                    }
                    return { result: true, msg: "success" };
                })
                    .catch(function (result) {
                    return { result: false, msg: AuthenticationErrors.GenericError };
                })];
            case 1:
                FirebaseSuccess = _a.sent();
                if (!(FirebaseSuccess['result'])) {
                    res.send(FirebaseSuccess['msg']);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, ValidateNewAccount("" + email, res)
                        .then(function (result) {
                        if (result['result'] == AuthenticationErrors.GenericError) {
                            return { result: false, msg: AuthenticationErrors.GenericError };
                        }
                        res.cookie('Clastics', result['result'], {
                            httpOnly: true
                        });
                        res.send(AuthSuccess.Success);
                        return { result: true, msg: "success" };
                    })
                        .catch(function () {
                        return { result: false, msg: AuthenticationErrors.GenericError };
                    })];
            case 2:
                KongUserAddSuccess = _a.sent();
                if (!(KongUserAddSuccess['result'])) {
                    return [2 /*return*/, KongUserAddSuccess['msg']];
                }
                return [2 /*return*/];
        }
    });
}); };
/*
*  Endpoint to register a user on firebase and
*  consumer object ceation for kong supplmented
*  with a JWT
*/
exports.AuthRouter.post('/register', function (req, res) {
    if (!NonNullCredentials(req.query.email, req.query.password)) {
        res.send(AuthenticationErrors.EmptyStringError);
        return;
    }
    CreateAccount(req.query.email, req.query.password, res)
        .then()
        .catch(function (result) { return res.send(result); });
});
exports.AuthRouter.get('/login', function (req, res) {
    if (!NonNullCredentials(req.query.email, req.query.password)) {
        res.send(AuthenticationErrors.EmptyStringError);
        return;
    }
    ValidateAccount(req.query.email, req.query.password, res)
        .then()
        .catch(function (result) { return res.send(result); });
});
//# sourceMappingURL=auth-routes.js.map