const {validationResult} = require('express-validator');
const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
    {
        "id" : "p1",
        "title" : "Sri Lanka",
        "description" : "Sri Lanka, historically known as Ceylon and officially the Democratic Socialist Republic of Sri Lanka, is an island country in South Asia. ",
        "location" : {
            "lat": 7.8556276,
            "lng": 79.386807
        },
        "country" : "Sri Lanka",
        "creator" : "u1"
    },
    {
        "id" : "p2",
        "title" : "Sri Pada",
        "description" : "A 7,360-foot high mountain peak with a footprint-shape feature & pilgrimage site accessed by trails.",
        "location" : {
            "lat": 6.8096427,
            "lng": 80.4890885
        },
        "country" : "Sri Lanka",
        "creator" : "u1"
    },
    {
        "id" : "p3",
        "title" : "Sentosa",
        "description" : "Vibrant island with sandy beaches, hotels & a casino, plus golf courses, a theme park & aquarium.",
        "location" : {
            "lat": 1.2489641,
            "lng": 103.8172559
        },
        "country" : "Sigapore",
        "creator" : "u2"
    },
    {
        "id" : "p4",
        "title" : "New Zealand",
        "description" : "New Zealand is an island country in the southwestern Pacific Ocean.",
        "location" : {
            "lat": -39.1376182,
            "lng": 154.8246382
        },
        "country" : "New Zealand",
        "creator" : "u3"
    },
    {
        "id" : "p5",
        "title" : "Auckland",
        "description" : "Auckland, based around 2 large harbours, is a major city in the north of New Zealand’s North Island.",
        "location" : {
            "lat": -36.8596971,
            "lng": 174.5413139
        },
        "country" : "New Zealand",
        "creator" : "u3"
    }
];

// Get all places
const getAllPlaces = (req, res, next) => {
    res.json(DUMMY_PLACES);
};

// Get places by place id
const getPlaceById = (req, res, next) => {
    const place = DUMMY_PLACES.find(p => {
        return p.id === req.params.pid;
    });

    if (!place) {
        throw new HttpError("Could not find a place for given place id!", 404);
    }

    res.json(place);
};

// Get places by created user id
const getPlacesByUserId = (req, res, next) => {
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === req.params.uid;
    });

    if (!places || places.length === 0) {
        return next(new HttpError("Could not find a places for given user id!", 404));
    }

    res.json(places);
};

// Create a place
const createPlace = (req, res, next) => {
    // Data validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid request, check the request data!', 422);
    }

    const {title, description, coordinates, country, creator} = req.body;

    const createdPlace = {
        id : uuid(),
        title, 
        description, 
        location : coordinates,
        country, 
        creator
    }

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
};

// Update a place
const updatePlace = (req, res, next) => {
    // Data validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid request, check the request data!', 422);
    }

    const {title, description} = req.body;
    const pid = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === pid)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === pid);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    
    res.status(200).json({place: updatedPlace});
};

// Delete a place
const deletePlace = (req, res, next) => {
    const pid = req.params.pid;

    const hasPlace = DUMMY_PLACES.find(p => p.id === req.params.pid);
    if (!hasPlace) {
        throw new HttpError("Could not delete non exist place!", 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== pid);
    res.status(200).json({'message': 'Place Succssfully Deleted!'});
};

exports.getAllPlaces = getAllPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;