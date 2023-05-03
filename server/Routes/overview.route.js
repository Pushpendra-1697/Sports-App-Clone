const { Router } = require('express');
const { EventModel } = require('../Models/event.model');
const UserModel = require('../Models/users.model');
const overviewRouter = Router();

//end points: "/overview/accepted/:id/:index" for filter accepted users for any particular event;
overviewRouter.get('/accepted/:id/:index', async (req, res) => {
    res.send('I am overview Route');
});

//end points: "/overview/rejected/:id/:index" for filter rejected users for any particular event;
overviewRouter.get('/rejected/:id/:index', async (req, res) => {
   res.send("I am Overview Route");
});

module.exports = { overviewRouter };