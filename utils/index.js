const mongoose = require('mongoose');
const {
    logInfo,
    logError,
    error,
    success,
    httpPath,
    warning,
    logWithBg,
    info
} = require('./chalk-theme');

const fetchModel = async (modelName) => {
    let isModelPresent;
    try {
        const model = await mongoose.model(modelName);
        isModelPresent = model;
    } catch (error) {
        isModelPresent = false;
        console.error('fetchModel error', error?.message);
    }
    return isModelPresent;
}

const findAll = async ({ modelName, res, method }) => {
    try {
        const model = await fetchModel(modelName);
        if (model) {
            const list = await model.find();
            if (method === 'add') {
                return res.status(201).json({ [modelName]: list });
            }
            return res.status(200).json({ [modelName]: list });
        }
        throw new Error(`Unable to find ${modelName} model`);
    } catch (error) {
        console.error('findAll error:', error)
        return res.status(500).json({ error: error?.message });
    }
}

const findItemById = async ({ modelName, res, type, value }) => {
    try {
        const model = await fetchModel(modelName);
        if (model) {
            const data = await model.findById({ [type]: value });
            return res.status(200).json(data);
        }
        throw new Error(`Unable to find ${modelName} model`);
    } catch (error) {
        console.error('findItemById error:', error)
        return res.status(500).json({ error: error?.message });
    }
}

const removeItemById = async ({ modelName, res, type, value }) => {
    try {
        const model = await fetchModel(modelName);
        if (model) {
            const data = await model.findById({ [type]: value });
            data.isDeleted = true;
            data.updatedOn = Date.now();
            await data.save(); // save() will update and return the updated document. without save, it will return original document
            return res.status(200).json(data);
        }
        throw new Error(`Unable to find ${modelName} model`);
    } catch (error) {
        console.error('removeItemById error:', error)
        return res.status(500).json({ error: error?.message });
    }
}

const createItem = async ({ modelName, req, res }) => {
    try {
        const model = await fetchModel(modelName);
        if (model) {
            const { _id = '' } = await model.create(req.body);
            if (_id) {
                return findAll({ modelName, res, method: 'add' });
            }
            throw Error('Unable to create data, Please try again');
        }
        throw new Error(`Unable to find ${modelName} model`);
    } catch (error) {
        console.error('createItem error:', error)
        return res.status(500).json({ error: error?.message });
    }
}

const updateItemById = async ({ modelName, req, res }) => {
    try {
        const model = await fetchModel(modelName);
        if (model) {
            const { id } = req.params;
            // const data = await Promise.all(Object.keys(req.body).map(async keyName => {
            //     const options = { new: true };
            //     // new: true will return the modified document rather than original
            //     const updatedData = await model.findByIdAndUpdate(id,
            //         typeof req.body[keyName] === 'object' ? { ...options, $addToSet: { [keyName]: req.body[keyName] } } : { ...options, [keyName]: req.body[keyName] }
            //     );
            //     return updatedData;
            // }))
            const newObj = await addUpdateKeyValues({ model, data: req.body, id });
            if (!(newObj instanceof Error)) {
                return await findAll({ modelName, res });
            }
            throw new Error(newObj);
            // const updatedData = await model.findByIdAndUpdate(id, { $addToSet: { videos: req.body.videos }, new: true });
        }
        throw new Error(`Unable to find ${modelName} model`);
    } catch (error) {
        console.error('updateItemById error:', error)
        return res.status(500).json({ error: error?.message });
    }
}

const errorResponse = ({ error, type, res }) => {
    console.error(type, error);
    return res.status(500).json({ error: error?.message });
}

const addUpdateKeyValues = async ({ model, data, id }) => {
    try {
        return await Promise.all(Object.keys(data).map(async keyName => {
            const options = { new: true };
            // new: true will return the modified document rather than original
            const updatedData = await model.findByIdAndUpdate(id,
                typeof data[keyName] === 'object' ? { ...options, $addToSet: { [keyName]: data[keyName] } } : { ...options, [keyName]: data[keyName] }
            );
            return updatedData;
        }))
    } catch (error) {
        console.error('addUpdateKeys error', error);
        return error;
    }
}


module.exports = {
    fetchModel,
    findAll,
    findItemById,
    removeItemById,
    createItem,
    updateItemById,
    errorResponse,
    logInfo,
    logError,
    error,
    success,
    httpPath,
    warning,
    logWithBg,
    info
};