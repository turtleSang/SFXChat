const {Group} = require("../models");

const getGroup = async (id)=>{
    let group = await Group.findOne({
        where: {
            id
        }
    });
    return group;
}
module.exports = {getGroup};