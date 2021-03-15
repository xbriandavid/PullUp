"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentConfig = void 0;
var _ = require('lodash');
var dotenv = require('dotenv');
dotenv.config();
var config_file = require('./config.json');
var defaultConfig = config_file.development;
var environment = process.env["NODE_ENV"];
exports.environmentConfig = config_file[environment];
//# sourceMappingURL=config.js.map