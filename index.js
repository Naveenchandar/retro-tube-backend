const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const { dbInitialize, dbConnectionMiddleware } = require('./connection');
const { videosModel } = require('./models/videos');
const { playlistModel } = require('./models/playlist');
const { videoRouters } = require('./routers/videos');
const { playlistRouters } = require('./routers/playlists');

const envConfig = dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(dbConnectionMiddleware);

app.use('/videos', videoRouters);
app.use('/playlists', playlistRouters);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.port || 4000, async () => {
    try {
        console.log(`Port listening on ${process.env.port || 4000}, server started`);
        await dbInitialize();
    } catch (error) {
        console.error('server starting error', error?.message);
    }
})