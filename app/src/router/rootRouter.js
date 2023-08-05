const express = require("express");
const rootRouter = express.Router();
const {routerUser} = require("./userRouter");
const {routerGroup} = require("../router/group_userRouter");
const {messengerRouter} = require("./messengerRouter");

rootRouter.use("/user", routerUser);
rootRouter.use("/listgroup", routerGroup);
rootRouter.use("/messenger", messengerRouter);

module.exports = {rootRouter}