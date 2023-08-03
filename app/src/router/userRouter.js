const express =  require("express");
const routerUser = express.Router();
const {register, login, findUser, verify} = require("../controllers/user.controler");

const {authenticate} =require("../middleware/authenticate/authenticate");

routerUser.post("/register", register);

routerUser.post("/login", login);

routerUser.get("/find/:name", authenticate , findUser);

routerUser.get("/verify", verify);


module.exports = {routerUser}