const mongoose = require('mongoose');
const { videosSchema} = require('./videos');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // unique key is added to avoid duplicates
    postedOn: { type: String, default: Date.now() },
    updatedOn: { type: String },
    videos: { type: [videosSchema] },
    user: { type: mongoose.Types.ObjectId, ref: 'users' }
}, { timestamps: true })

const playlistModel = mongoose.model('playlists', playlistSchema);

module.exports = { playlistModel, playlistSchema }