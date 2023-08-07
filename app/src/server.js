//Express
const express = require("express");
const path = require("path");
const { rootRouter } = require("./router/rootRouter");
//Server http
const http = require('http');
//Socket IO
const { Server } = require("socket.io");
//Service Model
const { getGroup } = require("./service/group.services");
//Model
const {Messenger, Group} = require("./models");
//fomat date
const formatDate = require("date-format");
const { NUMBER } = require("sequelize");


const port = 3000;
const app = express();
const publicDirect = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.static(publicDirect));
app.use("/api/v1", rootRouter);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
    
    socket.on("join to room", (listRoomID) => {
        listRoomID.forEach(roomId => {
            socket.join(roomId);
        });              
    });
    socket.on("create Group", (newGroup)=>{
        socket.broadcast.emit("send new group to client", newGroup);
    });
    socket.on("send mess to server", async ({group_id, user_id, user_name, text})=>{
        let newText = await Messenger.create({group_id, user_id, text});
        let {createdAt}= newText;
        let createDate = formatDate('dd/MM/yyyy-hh:mm', createdAt);
        //send mess to sender
        socket.emit("send mess to sender", {
            group_id,
            text,
            createDate
        });
        let roomId = Number(group_id);
        //send mess to reciver
        socket.broadcast.to(roomId).emit("send mess to reciver", {
            group_id,
            user_name,
            text,
            createDate
        });            
    });
    socket.on("leave group", async ({group_id, username, user_id})=>{
        let group = await Group.findOne({
            where:{
                id: group_id
            }
        });
        let {groupname} = group;
        socket.broadcast.to(group_id).emit("send people leave group", {groupname, group_id, username, user_id})
        socket.leave(group_id);
    }) 
    
});


server.listen(port, () => {
    console.log(`run on ${port}`);
})