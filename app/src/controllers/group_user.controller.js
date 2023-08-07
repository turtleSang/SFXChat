const { Group, Groups_users, sequelize } = require("../models");

const getListGroup = async (req, res) => {
    const { user } = req.body;
    let id = user.id;
    let [listGroup] = await sequelize.query(
        ` select chatapp.groups.groupname, chatapp.groups.id from chatapp.groups_users
        inner join chatapp.groups on chatapp.groups_users.group_id = chatapp.groups.id
        where chatapp.groups_users.user_id = "${id}" order by chatapp.groups.createdAt desc
         `
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

const getMemberOfGroup = async (req, res) =>{
    const {groupId} = req.params;
    const {user} = req.body;
    let [listUser] = await sequelize.query(
        `SELECT chatapp.users.username, chatapp.users.id FROM chatapp.groups_users
        inner join chatapp.users on chatapp.groups_users.user_id = chatapp.users.id
        where chatapp.groups_users.group_id = ${groupId};
        `
    );
    for (const member of listUser) {
        if (member.id == user.id) {
            member.username = "You";
        }
    }
    res.status(200).send(listUser);
}

const leaveGroup = async (req, res) =>{
    let {groupId:group_id} = req.params;
    let {user} = req.body;
    let {id:user_id} = user;
    console.log(group_id, user_id);
    try {
        await Groups_users.destroy({
            where:{
                group_id,
                user_id
            }
        });
        res.status(200).send({
            state: true,
            comment: "has left group"
        });
    } catch (error) {
        res.status(500).send({
            state: false,
            comment: error,
        });
    }
    
}

module.exports = { getListGroup, createGroup, checkRenderNewGroup, getMemberOfGroup, leaveGroup};