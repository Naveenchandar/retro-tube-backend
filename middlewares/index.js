const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const morgan = require('morgan');
const { dbConnectionMiddleware } = require('./db');
const { 
    errorLogger,
    errorResponder,
    errorPath
 } = require('./errors');

const expressJson = () => express.json(); // for parsing application/json
const expressUrlEncoded = express.urlencoded({ extended: true }); // for parsing application/x-www-form-urlencoded

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        '\n\n\n',
        chalk.hex('#ff4757').bold('😎  MorganChalk --> '),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        '\n\n\n',
    ].join(' ');
});

module.exports = {
    dbConnectionMiddleware,
    cors,
    expressJson,
    expressUrlEncoded,
    errorLogger,
    errorResponder,
    errorPath,
    morganMiddleware
}