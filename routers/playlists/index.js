const express = require('express');
const { fetchAllPlaylists, addPlaylist, updatePlaylistsById, fetchPlaylistsById, fetchPlaylistsByUser } = require('./helper');
const { fetchVideoById } = require('../videos/helper');
const { authorizationMiddleware } = require('../../middlewares');

const playlistRouters = express.Router();


playlistRouters.route('/')
    .get(authorizationMiddleware, fetchAllPlaylists)
    .post(addPlaylist)

playlistRouters.route('/:id')
    .get(authorizationMiddleware, fetchPlaylistsById)
    .post(authorizationMiddleware, updatePlaylistsById)

playlistRouters.route('/user/:id')
    .get(authorizationMiddleware, fetchPlaylistsByUser)


module.exports = { playlistRouters };