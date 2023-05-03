const { Router } = require('express');
const { EventModel } = require('../Models/event.model');
const acceptRouter = Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/users.model');
const { validate } = require('../Middleware/validate.middleware');

//end point: "/getAllRequests" for getting all requests of users for different events;
acceptRouter.get('/getAllRequests', validate, async (req, res) => {
    res.send('I am Accept Route')
});

//end point: "/changeStatus/:id" for updating the requests status of users of any particular event by id;
acceptRouter.patch('/changeStatus/:id', validate, async (req, res) => {
    res.send('I am Accept Route')
});

//end points: "/rejectRequest/:id" for reject request of users of any particular event by id; 
acceptRouter.patch('/rejectRequest/:id', validate, async (req, res) => {
    res.send('I am Accept Route')
});

//end points: "/accept" for checking users can make the request or not for any particular event; 
acceptRouter.post('/accept', async (req, res) => {
    res.send('I am Accept Route')
});

module.exports = { acceptRouter };