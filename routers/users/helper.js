const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    findAll,
    errorResponse,
    fetchModel
} = require('../../utils');

const fetchAllUsers = async (req, res) => {
    try {
        return await findAll({ modelName: 'users', res });
    } catch (error) {
        errorResponse({ error, type: 'fetchAllUsers error', res });
    }
}

const throwError = (type) => {
    throw Error(`${type} is missing from payload`);
}

/**
 * If the email contains at least one letter or number, followed by an @ symbol, followed by at least
 * one letter, followed by a period, followed by at least two or three letters, then the email is
 * valid.
 * @param email - The email address to validate.
 */
const isValidEmail = email => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);

const signUpUser = async (req, res, next) => {
    try {
        const { email = '', firstname = '', lastname = '', password = '', confirmPassword = '' } = req.body;
        if (!email) throwError('email');
        if (!firstname) throwError('firstname');
        if (!lastname) throwError('lastname');
        if (!password) throwError('password');
        if (!confirmPassword) throwError('confirmPassword');
        if (password?.trim()?.toLowerCase() !== confirmPassword?.trim()?.toLowerCase()) throw new Error('password mismatch');
        if(!isValidEmail(email)) throw new Error('Email id provided is not valid');
        const model = await fetchModel('users');
        if (!model) throw new Error(`Unable to find ${modelName} model`);
        const emailFound = await model.findOne({ email });
        if (emailFound) {
            throw { status: 403, message: `User already exists with same email ${email}, Please try with another email` };
        }
        const salt = await bcrypt.genSalt(10);
        const userPassword = await bcrypt.hash(password, salt);
        const object = {
            ...req.body, password: userPassword, confirmPassword: userPassword
        };
        const newUser = await model.create(object);
        if (!newUser?._id) throw new Error('Signup failed, Please try again');
        const userObj = {
            email,
            firstname,
            lastname,
            playlists: newUser?.playlists || []
        }
        const token = await jwt.sign(
            { user: userObj }, process.env.secretkey, { expiresIn: '24hr' }
        )
        res.status(201).json({ message: 'User created successfully', user: token });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) throwError('email');
        if (!password) throwError('password');
        if(!isValidEmail(email)) throw new Error('Email id provided is not valid');
        const model = await fetchModel('users');
        if (!model) throw new Error(`Unable to find ${modelName} model`);
        const findUser = await model.findOne({ email });
        if (!findUser) throw { status: 401, message: `user with ${email} not found` };
        const isValidPassword = await bcrypt.compare(password, findUser.password);
        if (!isValidPassword) throw new Error('Password incorrect');
        const userObj = {
            email: findUser.email,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            playlists: findUser?.playlists
        }
        const token = await jwt.sign(
            { user: userObj },
            process.env.secretkey,
            { expiresIn: "24h" }
        );
        res.status(200).json({
            message: "Login successful.",
            user: { token },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    fetchAllUsers,
    signUpUser,
    loginUser
}