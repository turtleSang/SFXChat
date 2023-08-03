const { Op } = require("sequelize");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    let { username, password, phonenumber } = req.body;
    console.log(username);
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        const newUser = await User.create({
            username,
            password: hashPassword,
            phonenumber
        })
        res.send(` ${newUser.username} has created `)
    } catch (error) {
        res.status(500).send(error);
    }

}

const login = async (req, res) => {
    const { phonenumber, password } = req.body;
    let user = await User.findOne({
        where: {
            phonenumber
        }
    });
    if (user) {
        let isAuthen = await bcryptjs.compare(password, user.password);
        if (isAuthen) {
            const token = jwt.sign({ id: user.id, username: user.username, phonenumber: user.phonenumber, password: user.password }, 'ThankSen', { expiresIn: '2d' });
            res.status(200).send({
                status: true,
                nofi: "đăng nhập thành công",
                token
            })
        } else {
            res.status(500).send({
                status: false,
                nofi: "sai mật khẩu"
            });
        }
    }
}

const findUser = async (req, res) => {
    try {
        let { name } = req.params;
        let {user} = req.body;
        let listUser = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${name}%`
                }
            }
        });
        let listUserName = [];
        for (const user of listUser) {
            listUserName = [...listUserName, {username: user.username, id: user.id}]
        };
        // not allow User send reques
        listUserName = listUserName.filter(item => item.id !== user.id);
        res.status(200).send(listUserName)
    } catch (error) {
        console.log(error);
    }
}

const verify = async (req, res) => {
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, "ThankSen");
        if (decode) {
            const { id, username, phonenumber } = decode;
            let user = { id, username, phonenumber };
            res.status(200).send(user)
        } else {
            res.status(400).send("You must login before");
        }
    } catch (err) {
        res.status(400).send("You must login before");
    }


}


module.exports = { register, login, findUser, verify };