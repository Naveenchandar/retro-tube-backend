const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { dbInitialize } = require('./connection');
const { videosModel } = require('./models/videos');
const { playlistModel } = require('./models/playlist');
const { videoRouters } = require('./routers/videos');
const { playlistRouters } = require('./routers/playlists');
const {
    dbConnectionMiddleware,
    cors,
    expressJson,
    expressUrlEncoded,
    errorLogger,
    errorResponder,
    errorPath
} = require('./middlewares');

const envConfig = dotenv.config();

app.use(cors());
app.use(expressJson());
app.use(expressUrlEncoded);
app.use(dbConnectionMiddleware);


app.use('/videos', videoRouters);
app.use('/playlists', playlistRouters);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(errorLogger);
app.use(errorResponder);
app.use(errorPath);

app.listen(process.env.PORT || 3000, async () => {
    try {
        console.log(`Port listening on ${process.env.PORT || 3000}, server started`);
        await dbInitialize();
    } catch (error) {
        console.error('server starting error', error?.message);
    }
})