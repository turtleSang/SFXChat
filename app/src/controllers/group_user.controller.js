const { Group, Groups_users, sequelize } = require("../models");

const getListGroup = async (req, res) => {
    const { user } = req.body;
    let id = user.id;
    let [listGroup] = await sequelize.query(
        ` select chatapp.groups.groupname, chatapp.groups.id from chatapp.groups_users
        inner join chatapp.groups on chatapp.groups_users.group_id = chatapp.groups.id
        where chatapp.groups_users.user_id = "${id}" `
    );
    res.status(200).send(listGroup);
};

const createGroup = async (req, res) => {
    const { listID, groupname } = req.body;

    if (groupname && listID) {
        let newGroup = await Group.create({
            groupname
        });
        let group_id = newGroup.id;
        let newGroupUser = '';
        for (const user_id of listID) {
            newGroupUser += await Groups_users.create({
                user_id,
                group_id

            })
        }
        res.status(200).send(newGroup);

    } else {
        res.status(500).send("Groupname must be fill")
    }
}

const checkRenderNewGroup = async (req, res) =>{
    const {user} = req.body;
    const {groupId} = req.params;
    const [group] = await sequelize.query(
        `
            select * FROM chatapp.groups_users 
            inner join chatapp.groups on chatapp.groups_users.group_id = chatapp.groups.id
            where chatapp.groups_users.user_id = ${user.id} and chatapp.groups_users.group_id = ${groupId};
        `
    );
    if (group.length > 0) {
        res.send({result: true});
    }else{
        res.send({result:false});
    }
    
}

module.exports = { getListGroup, createGroup, checkRenderNewGroup};