const dbConnectionMiddleware = async (req, res, next) => {
    try {
        console.log('dbConnectionMiddleware', Date.now());
        next();
    } catch (error) {
        console.error('dbConnectionMiddleware error, db connection error', error);
    }
}

module.exports = { dbConnectionMiddleware };