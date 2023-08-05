const { Messenger, Groups_users, sequelize } = require("../models");
const formatDate =require("date-format");

const getMessenger = async (req, res) => {
    let { user } = req.body;
    let { id: user_id } = user;
    try {
        let listGroup = await Groups_users.findAll({
            where: {
                user_id
            }
        })
        let listGroupId = [];
        for (const group of listGroup) {
            listGroupId = [...listGroupId, group.group_id];
        };

        // make raw query
        let queryMessenger =
            `
            SELECT chatapp.messengers.text,chatapp.messengers.user_id ,chatapp.users.username, chatapp.messengers.createdAt,  chatapp.messengers.group_id FROM chatapp.messengers
            inner join chatapp.users on chatapp.users.id = chatapp.messengers.user_id
            where 
        `;

        for (const index in listGroupId) {
            if (index > 0) {
                queryMessenger += ' or '
            }
            queryMessenger += `chatapp.messengers.group_id = ${listGroupId[index]}`
        };
        // set order by time create for mess
        queryMessenger += ' order by chatapp.messengers.createdAt asc'

        const [ListMessenger] = await sequelize.query(queryMessenger);

        for (const messenger of ListMessenger) {
            messenger.createdAt = formatDate('dd/MM/yyyy-hh:mm', messenger.createdAt)
        }
        
        res.status(200).send(ListMessenger);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getMessenger }