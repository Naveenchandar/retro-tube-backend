const mongoose = require('mongoose');
const app = require('express');

const dbInitialize = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@${process.env.cluster}.mongodb.net/${process.env.dbname}`);
        console.log('db connected successfully');
    } catch (error) {
        console.error('dbInitialize error', error?.message);
    }
}

const dbConnectionMiddleware = async (req, res, next) => {
    try {
        console.log('dbConnectionMiddleware', Date.now());
        await dbInitialize();
        next();
    } catch (error) {
        console.error('dbConnectionMiddleware error, db connection error');
    }
}


module.exports = { dbInitialize, dbConnectionMiddleware };