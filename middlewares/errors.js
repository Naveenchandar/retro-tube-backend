const errorLogger = (error, req, res, next) => {
    console.error('===================errorLogger:====================', error.message);
    next(error);
}

const errorResponder = (error, req, res, next) => {
    console.error('===================errorResponder:====================', error.message);
    const status = error.status || 400;
    res.status(status).json({ error: error.message });
}

const errorPath = (error, req, res, next) => {
    console.error('===================errorPath:====================', error.message);
    res.status(404);
    res.send('invalid path');
}

module.exports = {
    errorLogger,
    errorResponder,
    errorPath
}