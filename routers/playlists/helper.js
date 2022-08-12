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

const addPlaylist = async (req, res) => {
    try {
        const { name = '' } = req?.body;
        if (name) {
            return await createItem({ modelName: 'playlists', req, res });
        }
        throw new Error('name key is missing');
    } catch (error) {
        errorResponse({ error, type: 'addPlaylist error', res });
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

module.exports = { fetchPlaylistModel, fetchAllPlaylists, addPlaylist, updatePlaylistsById, fetchPlaylistsById };