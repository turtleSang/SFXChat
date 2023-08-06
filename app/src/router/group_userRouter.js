const expresss = require("express");
const routerGroup = expresss.Router();
const {authenticate} = require("../middleware/authenticate/authenticate")
const {getListGroup, createGroup, checkRenderNewGroup, getMemberOfGroup} = require("../controllers/group_user.controller");

routerGroup.get("/get", authenticate, getListGroup);
routerGroup.post("/create", createGroup);
routerGroup.get("/checkRenderNewGroup/:groupId", authenticate, checkRenderNewGroup);
routerGroup.get("/getlistuser/:groupId", authenticate, getMemberOfGroup);

module.exports = {routerGroup};