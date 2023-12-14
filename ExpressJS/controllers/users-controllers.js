
const {validationResult} = require('express-validator');
const uuid = require('uuid').v4;
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id : 'u1',
        name : 'Jayasanka',
        email : 'jay@gmail.com',
        password : 'PassWD'
    }
];

// Get all users
const getUsers = (req, res, next) => {
    res.status(200).json({users: DUMMY_USERS});
};

// Add user
const signup = (req, res, next) => {
    // Data validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid request, check the request data!', 422);
    }

    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('User already exist for email!', 422);
    }

    const createdUser = {
        id : uuid(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({createdUser});
};

// Login user
const login = (req, res, next) => {
    const { email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('User Not Found!', 401);
    }

    res.json({message : 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

