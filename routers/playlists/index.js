const express = require('express');
const { fetchAllPlaylists, addPlaylist, updatePlaylistsById, fetchPlaylistsById, fetchPlaylistsByUser } = require('./helper');
const { fetchVideoById } = require('../videos/helper');

const playlistRouters = express.Router();


playlistRouters.route('/')
    .get(fetchAllPlaylists)
    .post(addPlaylist)

playlistRouters.route('/:id')
    .get(fetchPlaylistsById)
    .post(updatePlaylistsById)

playlistRouters.route('/user/:id')
    .get(fetchPlaylistsByUser)


module.exports = { playlistRouters };