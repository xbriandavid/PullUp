const _ = require('lodash')
const dotenv = require('dotenv')
dotenv.config()
const config_file = require('./config.json')
const defaultConfig = config_file.development
const environment= process.env["NODE_ENV"]
export const environmentConfig = config_file[environment]
