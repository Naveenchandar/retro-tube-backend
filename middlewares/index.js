const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnectionMiddleware } = require('./db');
const { 
    errorLogger,
    errorResponder,
    errorPath
 } = require('./errors');

const expressJson = () => express.json(); // for parsing application/json
const expressUrlEncoded = express.urlencoded({ extended: true }); // for parsing application/x-www-form-urlencoded

module.exports = {
    dbConnectionMiddleware,
    cors,
    expressJson,
    expressUrlEncoded,
    errorLogger,
    errorResponder,
    errorPath
}