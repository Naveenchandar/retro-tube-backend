const express = require('express');
const usersRouter = express.Router();
const { fetchAllUsers, signUpUser, loginUser } = require('./helper');

usersRouter.route('/')
    .get(fetchAllUsers)

usersRouter.route('/signup')
    .post(signUpUser)

usersRouter.route('/login')
    .post(loginUser)


module.exports = { usersRouter };