const chalk = require('chalk');

chalk.level = 1;
const logInfo = console.log;
const logError = console.error;
const info = chalk.bold.cyan;
const error = chalk.bold.red;
const success = chalk.bold.green;
const httpPath = chalk.blue;
const warning = chalk.bold.hex('#FFA500'); // Orange color
const logWithBg = chalk.white.bgBlue.bold;

module.exports = {
    logInfo,
    logError,
    error,
    success,
    httpPath,
    warning,
    logWithBg,
    info
}