const Express = require("express");
const messengerRouter = Express.Router();
const {authenticate}= require("../middleware/authenticate/authenticate");
const {getMessenger} = require("../controllers/messenger.controller");

messengerRouter.get("/get", authenticate ,getMessenger);

module.exports = {messengerRouter};

