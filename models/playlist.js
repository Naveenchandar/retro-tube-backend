const mongoose = require('mongoose');
const { videosScheme } = require('./videos');

const playlistScheme = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // unique key is added to avoid duplicates
    postedOn: { type: String, default: Date.now() },
    updatedOn: { type: String },
    videos: { type: [videosScheme] },
}, { timestamps: true })

const playlistModel = mongoose.model('playlists', playlistScheme);

module.exports = { playlistModel }