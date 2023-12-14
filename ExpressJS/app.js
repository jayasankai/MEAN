const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const placesRoute = require('./routes/places-routes');
const usersRoute = require('./routes/users-routes');

const app = express();

// Body parser for Post request
app.use(bodyParser.json());

// Routes
app.use('/api/places/', placesRoute);
app.use('/api/users/', usersRoute);

//error handling for not supported routes
app.use((req, res, next) => {
    throw new HttpError('Could not find this route!', 404);
});

// error handling for known errors
app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }

    res.status(err.code || 500);
    res.json({message:err.message} || 'An unknown error occured!');
});

// Server listen to request on this port
app.listen(5500);