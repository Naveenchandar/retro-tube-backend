const mongoose = require('mongoose');
const { playlistSchema } = require('./playlist');

const usersSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    playlists: [{ type: mongoose.Types.ObjectId, ref: 'playlists', default: [] }],
    // watchLater: { type: [playlistSchema] },
    // likedVideos: { type: [playlistSchema] }
}, { timestamps: true })

const userModel = mongoose.model('users', usersSchema);
module.exports = { userModel, usersSchema }