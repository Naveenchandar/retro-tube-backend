const mongoose = require('mongoose');

const videosScheme = new mongoose.Schema({
    alt: { type: String },
    title: { type: String, required: true },
    creator: { type: String },
    videoUrl: { type: String, required: true },
    views: { type: String },
    likes: { type: String },
    postedOn: { type: String, default: Date.now },
    type: { type: String },
    avatar: { type: String },
    thumbnail: { type: String },
    isDeleted: { type: Boolean },
    updatedOn: { type: String }
});

const videosModel = mongoose.model('Videos', videosScheme);

module.exports = { videosModel };