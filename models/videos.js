const mongoose = require('mongoose');

const videosSchema = new mongoose.Schema({
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
    isDeleted: { type: Boolean, default: false },
    updatedOn: { type: String }
}, { timestamps: true });

const videosModel = mongoose.model('Videos', videosSchema);

module.exports = { videosModel, videosSchema };