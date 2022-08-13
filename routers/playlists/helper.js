const mongoose = require('mongoose');
const { fetchModel, findAll, createItem, updateItemById, errorResponse, findItemById } = require('../../utils');

const fetchPlaylistModel = async (req, res) => {
    let isModelPresent;
    try {
        const playlistModel = await fetchModel('playlists');
        isModelPresent = playlistModel;
    } catch (error) {
        isModelPresent = false;
        console.error('fetchplaylistmodel error', error?.message);
    }
    return isModelPresent;
}

const fetchAllPlaylists = async (req, res) => {
    try {
        return await findAll({ modelName: 'playlists', res });
    } catch (error) {
        errorResponse({ error, type: 'fetchAllPlaylists error', res });
    }
}

const fetchPlaylistsByUser = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        if (!userId) throw new Error('userId key is missing from payload');

        const model = await fetchModel('users');
        const playlistModel = await fetchModel('playlists');
        if (!model) throw { status: 404, message: `Unable to find ${model} model` };
        if (!playlistModel) throw { status: 404, message: `Unable to find ${playlistModel} model` };
        const findUser = await model.findById({ _id: userId });
        if (!findUser) throw { status: 404, message: `User with userid ${userId} not found` };
        const playlists = await playlistModel.find();
        if (!playlists) throw { status: 404, message: `User with userid ${userId} not found` };
        const data = playlists.filter(item => item.user?.toString() === userId);
        res.status(200).json({ playlists: data });
    } catch (error) {
        next(error);
    }
}

const addPlaylist = async (req, res, next) => {
    try {
        const { name = '', userId = '', videos = [] } = req?.body;
        if (!name) throw new Error('name key is missing from payload');
        if (!userId) throw new Error('userId key is missing from payload');
        const model = await fetchModel('users');
        const playlistModel = await fetchModel('playlists');
        if (!model) throw { status: 404, message: `Unable to find ${model} model` };
        if (!playlistModel) throw { status: 404, message: `Unable to find ${playlistModel} model` };
        let user = await model.findById({ _id: userId });
        if (!user) throw { status: 404, message: `User with userid ${userId} not found` };
        if (user?.playlists?.length > 0) {
            const isPlaylistNamePresent = user?.playlists?.find(item => item.name === name);
            if (isPlaylistNamePresent) throw new Error(`Playlist ${name} already exists!`);
        }
        const object = { name, user, videos };
        const data = await playlistModel.create(object);
        await user.playlists.push(data);
        await user.save();
        console.log('user:', user)
        if (!data?._id) throw new Error('Playlist creation failed, Please try again');
        res.status(201).json({ message: 'playlist created successfully', playlist: data })
    } catch (error) {
        next(error);
    }
}

const fetchPlaylistsById = async (req, res) => {
    try {
        const { params: { id } } = req;
        if (id) {
            return await findItemById({ modelName: 'playlists', res, type: '_id', value: id });
        }
        throw new Error('Playlist id is missing, Please pass the params');
    } catch (error) {
        errorResponse({ error, type: 'fetchPlaylistsById error', res });
    }
}

const updatePlaylistsById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (name) {
            return await updateItemById({ modelName: 'playlists', req, res });
        }
        throw new Error('name key is missing');
    } catch (error) {
        errorResponse({ error, type: 'updatePlaylistsById error', res });
    }
}

module.exports = {
    fetchPlaylistModel,
    fetchAllPlaylists,
    addPlaylist,
    updatePlaylistsById,
    fetchPlaylistsById,
    fetchPlaylistsByUser
};