const { Router } = require('express');
const { EventModel } = require('../Models/event.model');
const acceptRouter = Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/users.model');
const { validate } = require('../Middleware/validate.middleware');

//end point: "/getAllRequests" for getting all requests of users for different events;
acceptRouter.get('/getAllRequests', validate, async (req, res) => {
    let query = req.query;
    try {
        let requests = await EventModel.find(query);
        res.status(200).send(requests);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

//end point: "/changeStatus/:id" for updating the requests status of users of any particular event by id;
acceptRouter.patch('/changeStatus/:id', validate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { event_id } = req.headers;
    let date = new Date();
    let eventCheck = await EventModel.findOne({ _id: event_id });

    try {
        if (date <= eventCheck.start) {
            await EventModel.updateOne({ _id: event_id, "users._id": id }, { $set: { "users.$.status": status } });
            let event = await EventModel.findOne({ _id: event_id });
            res.status(200).send({ msg: `Successfully update Status`, event });
        } else {
            res.send({ msg: `Sorry😒 Game Start Already! You Can't Accept Now` });
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

//end points: "/rejectRequest/:id" for reject request of users of any particular event by id; 
acceptRouter.patch('/rejectRequest/:id', validate, async (req, res) => {
    const { id } = req.params;
    const { reject } = req.body;
    const { event_id } = req.headers;

    try {
        await EventModel.updateOne({ _id: event_id, "users._id": id }, { $set: { "users.$.reject": reject } });
        let event = await EventModel.findOne({ _id: event_id });
        res.status(200).send({ msg: `Successfully update Status`, event });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

//end points: "/accept" for checking users can make the request or not for any particular event; 
acceptRouter.post('/accept', async (req, res) => {
    let { token, event_id } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let user_id = token.id;
    let event = await EventModel.findOne({ _id: event_id });
    let date = new Date();

    try {
        if (event.admin_id !== user_id && event.maxPlayer > event.users.length && date <= event.start) {
            let userName = await UserModel.findOne({ _id: user_id });
            userName = userName.name;
            event.users.push({ userName, status: false });
            await event.save();
            let adminName = await UserModel.findOne({ _id: event.admin_id });
            adminName = adminName.name;
            res.send({ msg: "Send Request", event, adminName });
        } else if (event.admin_id === user_id) {
            let adminName = await UserModel.findOne({ _id: event.admin_id });
            adminName = adminName.name;
            res.send({ msg: "You are organizer so You can't Join this event", adminName });
        } else if (event.admin_id !== user_id && event.maxPlayer > event.users.length && date > event.start) {
            let userName = await UserModel.findOne({ _id: user_id });
            userName = userName.name;
            event.users.push({ userName, status: false });
            await event.save();
            let adminName = await UserModel.findOne({ _id: event.admin_id });
            adminName = adminName.name;
            res.send({ msg: `Sorry😒 Deadline Over! But Your Request send successfully`, event, adminName });
        } else {
            res.send({ msg: 'Something went Wrong!😒' });
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { acceptRouter };