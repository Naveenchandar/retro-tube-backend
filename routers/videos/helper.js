const mongoose = require('mongoose');
const { fetchModel, findAll, findItemById, removeItemById } = require('../../utils');

const fetchVideosModel = async () => {
    let isModelPresent = false;
    try {
        const videosModel = await fetchModel('Videos');
        isModelPresent = videosModel;
    } catch (error) {
        console.error('fetchVideosModel error:', error?.message);
        isModelPresent = false;
    }
    return isModelPresent;
}

const fetchAllVideos = async (req, res) => {
    try {
        return await findAll({ modelName: 'Videos', res });
    } catch (error) {
        console.error('fetchAllVideos:', error)
        return res.status(500).json(error?.message);
    }
}

const fetchVideoById = async (req, res) => {
    try {
        const { params: { id } } = req;
        if (id) {
            return await findItemById({ modelName: 'Videos', res, type: '_id', value: id });
        }
        throw new Error('Video id is missing, Please pass the params');
    } catch (error) {
        console.error('fetchVideoById:', error)
        return res.status(500).json(error?.message);
    }
}

const removeVideoById = async (req, res) => {
    try {
        const { params: { id } } = req;
        if (id) {
            return await removeItemById({ modelName: 'Videos', res, type: '_id', value: id });
        }
        throw new Error('Video id is missing, Please pass the params');
    } catch (error) {
        console.error('removeVideoById:', error)
        return res.status(500).json(error?.message);
    }
}

module.exports = { fetchVideoById, fetchAllVideos, removeVideoById }