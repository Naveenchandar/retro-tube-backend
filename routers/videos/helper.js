const mongoose = require('mongoose');

const fetchVideosModel = async () => {
    let isModelPresent = false;
    try {
        const videosModel = await mongoose.model('Videos');
        isModelPresent = videosModel;
    } catch (error) {
        console.error('fetchVideosModel error:', error?.message);
        isModelPresent = false;
    }
    return isModelPresent;
}

const fetchAllVideos = async (req, res) => {
    try {
        const videoModel = await fetchVideosModel();
        if (videoModel) {
            const videosList = await videoModel.find();
            return res.status(200).json(videosList);
        }
        throw new Error('Unable to find videos model');
    } catch (error) {
        console.error('error:', error)
        return res.status(500).json(error?.message);
    }
}

const fetchVideoById = async (req, res) => {
    try {
        const { params: { id } } = req;
        if (id) {
            const videoModel = await fetchVideosModel();
            if (videoModel) {
                const videosList = await videoModel.findById({ _id: id });
                return res.status(200).json(videosList);
            }
            throw new Error('Unable to find videos model');
        }
        throw new Error('Video id is missing, Please pass the params');
    } catch (error) {
        console.error('error:', error)
        return res.status(500).json(error?.message);
    }
}

const removeVideoById = async (req, res) => {
    try {
        const { params: { id } } = req;
        if (id) {
            const videoModel = await fetchVideosModel();
            if (videoModel) {
                const video = await videoModel.findById({ _id: id });
                video.isDeleted = true;
                video.updatedOn = Date.now();
                await video.save(); // save() will update and return the updated document. without save, it will return original document
                console.log('video:', video)
                return res.status(200).json(video);
            }
            throw new Error('Unable to find videos model');
        }
        throw new Error('Video id is missing, Please pass the params');
    } catch (error) {
        console.error('error:', error)
        return res.status(500).json(error?.message);
    }
}

module.exports = { fetchVideoById, fetchAllVideos, removeVideoById }