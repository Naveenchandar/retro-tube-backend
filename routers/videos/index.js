const express = require('express');
const videoRouters = express.Router();
const { fetchVideoById, fetchAllVideos, removeVideoById } = require('./helper');

videoRouters.route('/')
    .get(fetchAllVideos)

videoRouters.route('/:id')
    .get(fetchVideoById)
    .post(removeVideoById)

module.exports = { videoRouters };