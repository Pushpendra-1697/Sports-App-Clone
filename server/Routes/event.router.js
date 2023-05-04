const { Router } = require('express');
const { validate } = require('../Middleware/validate.middleware');
const eventRouter = Router();
const { EventModel } = require('../Models/event.model');
const jwt = require('jsonwebtoken');

//end points: "/events/post" for creating any new event by any logged user after creation that user become admin of that event;
eventRouter.post('/post', validate, async (req, res) => {
    let { name, desc, start, end, maxPlayer } = req.body;
    let { token } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let admin_id = token.id;
    let payload = { name, desc, start, end, maxPlayer, admin_id };

    try { 
        const event = new EventModel(payload);
        await event.save();
        res.status(201).send({ msg: 'Successfully Created an Event', event });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

//end points: "/events/get" for getting all events created by differnt admin;
eventRouter.get('/get', async (req, res) => {
    let { name, q, page = 1, limit = 7 } = req.query;

    try {
        if (name) {
            let events = await EventModel.find({ name });
            res.status(200).send(events);
        } else if (q) {
            let events = await EventModel.find({ name: { $regex: `${q}`, $options: "six" } });
            res.status(200).send(events);
        } else if (page) {
            if (Number(page) === 1) {
                let events = await EventModel.find().skip(0).limit(+limit);
                res.status(200).send(events);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let events = await EventModel.find().skip(s).limit(+limit);
                res.status(200).send(events);
            }
        } else {
            let events = await EventModel.find();
            res.status(200).send(events);
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

//end points: "/events/get/:id" for getting any particular event by id;
eventRouter.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await EventModel.findOne({ _id: id });
        res.status(200).send({ "msg": `Successfully get Event which id is ${id}`, event });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { eventRouter };