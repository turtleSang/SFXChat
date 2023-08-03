const express = require("express");
const rootRouter = express.Router();
const {routerUser} = require("./userRouter");
const {routerGroup} = require("../router/group_userRouter");

rootRouter.use("/user", routerUser);
rootRouter.use("/listgroup", routerGroup);

module.exports = {rootRouter}