const {User} =require("../models");

const findUserName = async (id) => { 
    let user = await User.find({
        where:{
            id
        }
    });
    return user;
}
module.exports = {findUserName};