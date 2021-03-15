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
var cors_1 = __importDefault(require("cors"));
var test_routes_1 = require("./routes/test-routes");
var express_openid_connect_1 = require("express-openid-connect");
var firebase_1 = __importDefault(require("firebase"));
var admin = __importStar(require("firebase-admin"));
var config_1 = require("../config");
var serviceAcc = require('./clastic-41c62-firebase-adminsdk-rfy2d-78616bbdf6.json');
var app = express_1.default();
var dotenv = require('dotenv');
dotenv.config();
var port = 3000;
// Config for cross-origin 
var config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'L1O8V8rvQTrkwZTqJZZBZ7JyTWOvEkuO',
    issuerBaseURL: 'https://dev-z91fkklm.us.auth0.com'
};
// Config for authorization
admin.initializeApp({ credential: admin.credential.cert(serviceAcc) });
firebase_1.default.initializeApp(config_1.environmentConfig['FIREBASE-CONFIG']);
var additionalClaims = { "registered": true };
var callback = function (req, res) {
    firebase_1.default.auth().createUserWithEmailAndPassword('a99@gmail.com', 'testPass')
        .catch(function (error) { return console.log(error); });
    admin.auth().createCustomToken("fakeEmailAccount@gmail.com", additionalClaims)
        .then(function (jwt) { res.send("YOUR TOKEN: " + jwt); })
        .catch(function (error) { console.log(error); });
    res.status(200);
};
app.use(cors_1.default());
app.use(express_openid_connect_1.auth(config_1.environmentConfig['CROSS-ORIGIN-CONFIG']));
app.use('/thisatest', test_routes_1.itemrouter);
app.get('/practice', callback);
app.get('/test', function (req, res) {
    res.json({
        "type": "RESPONSE!"
    });
    res.status(200);
});
app.listen(port, function () {
    console.log("listening on port 3000");
});
//# sourceMappingURL=index.js.map