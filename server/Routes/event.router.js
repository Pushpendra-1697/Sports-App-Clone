const { Router } = require('express');
const { validate } = require('../Middleware/validate.middleware');
const eventRouter = Router();
const { EventModel } = require('../Models/event.model');
const jwt = require('jsonwebtoken');

//end points: "/events/post" for creating any new event by any logged user after creation that user become admin of that event;
eventRouter.post('/post', validate, async (req, res) => {
    res.send('Event Route')
});

//end points: "/events/get" for getting all events created by differnt admin;
eventRouter.get('/get', async (req, res) => {
    res.send('Event Route')
});

//end points: "/events/get/:id" for getting any particular event by id;
eventRouter.get('/get/:id', async (req, res) => {
    res.send('Event Route')
});

module.exports = { eventRouter };