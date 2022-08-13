const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { dbInitialize } = require('./connection');
const { videosModel } = require('./models/videos');
const { playlistModel } = require('./models/playlist');
const { userModel } = require('./models/users');
const { videoRouters } = require('./routers/videos');
const { playlistRouters } = require('./routers/playlists');
const { usersRouter } = require('./routers/users');
const {
    dbConnectionMiddleware,
    cors,
    expressJson,
    expressUrlEncoded,
    errorLogger,
    errorResponder,
    errorPath,
    morganMiddleware
} = require('./middlewares');
const {
    logInfo,
    logError,
    error,
    logWithBg,
    info
} = require('./utils');

app.use(cors());
app.use(expressJson());
app.use(expressUrlEncoded);
app.use(dbConnectionMiddleware);
app.use(morganMiddleware);


app.use('/videos', videoRouters);
app.use('/playlists', playlistRouters);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(errorLogger);
app.use(errorResponder);
app.use(errorPath);

app.listen(process.env.PORT || 3000, async () => {
    try {
        logInfo(info('Hello Express and MongoDB'));
        logInfo(logWithBg(`Port listening on ${process.env.PORT || 3000}, server started`));
        await dbInitialize();
    } catch (error) {
        logError(error('server starting error', error?.message));
    }
})