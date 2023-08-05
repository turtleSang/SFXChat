const verify = async (token) => {
    if (token) {
        try {
            let res = await axios({
                method: 'get',
                url: '/api/v1/user/verify',
                headers: {
                    token
                }
            })
            return res.data;
        } catch (error) {
            window.location.replace("/index.html");
        }
    } else {
        window.location.replace("/index.html");
    }


}
const getEle = (id) => document.getElementById(id);

const getListChatGroup = async (token) => {
    try {
        let res = await axios({
            method: 'get',
            url: '/api/v1/listgroup/get',
            headers: {
                token
            },
        });

        return res.data;
    } catch (error) {
        window.location.replace("/index.html");
    }
}

//render all group chat
const renderGroupChat = async (token, socket) => {
    let listGroupChat = await getListChatGroup(token);
    let contentListGroup = '';
    let contentChat = '';
    let listRoomID = [];

    for (const item of listGroupChat) {
        let { groupname, id } = item;
        contentListGroup += `<li  data-room="${id}" class="list-group-item room-item ">${groupname}</li>`;
        contentChat += `<div id="${id}" class="messenger_chat"><h1></h1></div>`;
        listRoomID = [...listRoomID, id]
    }
    socket.emit("join to room", listRoomID);
    getEle('list_chat_group').innerHTML = contentListGroup;
    getEle('messenger_content').innerHTML = contentChat;
    addEventGroupName();
}

//Render Info of group selected
const renderChatInfo = (roomId, name_group) => {
    let chats = getEle("messenger_content").children;
    for (const item of chats) {
        item.style.display = "none";
    }
    getEle(roomId).style.display = "block";
    getEle("name_group").innerHTML = name_group
}

//add event for item of groupchat
const addEventGroupName = () => {
    let groupName = getEle("list_chat_group");
    let group_name = groupName.children;
    for (const element of group_name) {
        element.addEventListener("click", () => {
            let listGroup = groupName.getElementsByClassName("room-item");
            for (const item of listGroup) {
                item.classList.remove("active");
            }
            element.classList.add("active");
            let roomId = element.getAttribute("data-room");
            let name_group = element.innerHTML
            renderChatInfo(roomId, name_group);
        })
    }
}

//render user
const renderUserInfo = (user) => {
    getEle("user_name").innerHTML = user.username;
}


const findUser = async (username, token) => {
    try {
        let listUser = await axios({
            method: "get",
            url: `api/v1/user/find/${username}`,
            headers: {
                token
            }
        })
        return listUser.data
    } catch (error) {
        console.log(error);
    }
}

//Create group after fill form
const createGroup = async (idUserCreate, listUserID, groupname) => {
    listID = [idUserCreate];
    listUserID.forEach(userId => {
        listID = [...listID, userId];
    });
    try {
        let createGroup = await axios({
            method: "post",
            url: `/api/v1/listgroup/create`,
            data: {
                groupname,
                listID
            }
        });
        return createGroup;
    } catch (error) {
        console.log(error);
    }
}

//render NewGroup
const renderNewGroup = (groupId, groupname, socket)=>{
    //render listchat
    let listChatGroup = `<li  data-room="${groupId}" class="list-group-item room-item ">${groupname}</li>`;
    listChatGroup += getEle('list_chat_group').innerHTML;
    getEle("list_chat_group").innerHTML = listChatGroup;
    addEventGroupName();
    //render Chat Content
    let chatContent = 
    `
        <div id="${groupId}" class="messenger_chat"><h1>${groupname}</h1></div>
    `
    getEle('messenger_content').innerHTML += chatContent;
    socket.emit("join to room", [groupId]);    
}

//Delete user chosen
const deletetUser = (e) => {
    let element = e.currentTarget;
    let parrentElement = element.parentNode;
    parrentElement.remove();
}
//Chosen User to send
const chooseUser = (e) => {
    let chooseElement = e.target;
    let id = chooseElement.getAttribute("data-user-id");
    let username = chooseElement.innerHTML;

    let checkExits = false;
    // Check exits user has chosen
    let listChosen = getEle("list_chossen").children
    for (const item of listChosen) {
        let chosenID = item.getAttribute("data-user-id");
        if (chosenID == id) {
            checkExits = true;
        }
    }
    if (!checkExits) {
        getEle('list_chossen').innerHTML +=
            `
        <li data-user-id="${id}" class="chossen-item">
        <span>${username}</span>
        <button onclick="deletetUser(event)" data-delete="${id}" class="btn_delete_user"> X </button>
        </li>        `
    }
    getEle("result_search_user").innerHTML = '';
    getEle("input_search_user").value = '';
    nofiNull("nofi_list_user", "", false);
}
//check null nofi 
const nofiNull = (idElement, fields, condition) => {
    if (condition) {
        getEle(idElement).className = "alert alert-danger";
        getEle(idElement).innerHTML = `Must fill ${fields}`;
    } else {
        getEle(idElement).className = "";
        getEle(idElement).innerHTML = ``;
    }
}

//check null user List
getEle("input_search_user").onblur = () => {
    let listChossen = getEle("list_chossen").children;
    let checkNull = listChossen.length === 0;
    nofiNull("nofi_list_user", "Member", checkNull);
}

//check null groupname
getEle("new_group_name").onblur = () => {
    let value = getEle("new_group_name").value;
    if (!value) {
        getEle("nofi_group_name").className = "alert alert-danger";
        getEle("nofi_group_name").innerHTML = "Must fill Name Group";
    } else {
        getEle("nofi_group_name").className = "";
        getEle("nofi_group_name").innerHTML = "";
    }
}

//Render old messenger
const renderMessenger = async (token, client_id) =>{
    let res = await axios({
        method: 'get',
        url: "api/v1/messenger/get",
        headers:{
            token
        }
    });
    let listMessenger = res.data
    for (const messenger of listMessenger) {
        let {username,user_id,group_id,createdAt,text} = messenger;
        if (client_id == user_id) {
            getEle(group_id).innerHTML +=
            `
            <div class="mess_sender">
                <div class="mess_sender_content">
                    <p class="sender_info">
                        <span class="sender_name">You</span>
                        <span class="date_create">${createdAt}</span>
                    </p>
                    <p class="sender_text">${text}</p>
                </div>
            </div>
            `
        }else{
            getEle(group_id).innerHTML += 
            `
            <div class="mess_reciver">
                <div class="mess_reciver_content">
                    <p class="sender_info">
                        <span class="sender_name">${username}</span>
                        <span class="date_create">${createdAt}</span>
                    </p>
                    <p class="reciver_text">${text}</p>
                </div>
            </div>
            `
        }
    }
};



//clear form Create
const clearForm = () => {
    getEle("input_search_user").value = '';
    getEle('new_group_name').value = '';
    getEle('list_chossen').innerHTML = '';
    nofiNull("nofi_list_user", "", false);
    nofiNull("nofi_group_name", "", false);
    getEle("nofi_err").className = "";
    getEle("nofi_err").innerHTML = "";
}

window.onload = async () => {
    let token = document.cookie.split("=")[1];
    let user = await verify(token);
    let socket = io();
    //render Page
    renderUserInfo(user);
    renderGroupChat(token, socket);
    renderMessenger(token, user.id);


    getEle("create_group").onclick = async () => {
        let listEleChosen = getEle('list_chossen').getElementsByTagName("li");
        let groupname = document.getElementById("new_group_name").value;
        let listIdChosen = [];
        if (groupname && listEleChosen.length > 0) {
            for (const eleChosen of listEleChosen) {
                listIdChosen = [...listIdChosen, eleChosen.getAttribute("data-user-id")];
            }
            let newGroup = await createGroup(user.id, listIdChosen, groupname);
            //render
            renderNewGroup(newGroup.data.id, groupname, socket);
            getEle("close_form_create").click();
            socket.emit("create Group", newGroup.data);
        } else {
            getEle("nofi_err").className = "alert alert-danger";
            getEle("nofi_err").innerHTML = "Must fill Name Group and has member";
        }
    }
    getEle("input_search_user").oninput = async () => {
        let searchName = getEle("input_search_user").value;
        getEle("result_search_user").innerHTML = '';
        let listUser = await findUser(searchName, token);
        if (listUser.length > 0) {
            for (const user of listUser) {
                let { username, id } = user;
                getEle("result_search_user").innerHTML +=
                    `<li data-user-id="${id}" class="list-group-item" onclick="chooseUser(event)" >${username}</li>`
            };
        } else {
            getEle("result_search_user").innerHTML = "Not found"
        }
    }


    //Check new group to add
    socket.on("send new group to client", async (newGroup) => {
        let { id: groupId, groupname } = newGroup;
        console.log(groupId);
        let checkRender = await axios({
            method: 'get',
            url: `/api/v1/listgroup/checkRenderNewGroup/${groupId}`,
            headers: {
                token
            }
        })
        const { result } = checkRender.data
        if (result) {
            renderNewGroup(groupId, groupname, socket);
        }
    })

    getEle("send_mess").onclick = () => {
        let groupToSend = getEle("list_chat_group").querySelector(".active");
        let text = getEle("input_mess").value;
        if (groupToSend && text) {
            let group_id = groupToSend.getAttribute("data-room");
            let user_id = user.id;
            let user_name = user.username;
            socket.emit("send mess to server", {
                group_id,
                user_id,
                user_name,
                text
            });
        }
        getEle("input_mess").value ='';
    };
    socket.on("send mess to sender", ({group_id, text, createDate}) =>{
        let messengerContent = 
        `
            <div class="mess_sender">
                <div class="mess_sender_content">
                    <p class="sender_info">
                        <span class="sender_name">You</span>
                        <span class="date_create">${createDate}</span>
                    </p>
                    <p class="sender_text">${text}</p>
                </div>
            </div>
        `;
        getEle(group_id).innerHTML += messengerContent;
    });
    socket.on("send mess to reciver", ({group_id, user_name, text, createDate}) =>{
        let messengerContent = 
        `
            <div class="mess_reciver">
                <div class="mess_reciver_content">
                    <p class="sender_info">
                        <span class="sender_name">${user_name}</span>
                        <span class="date_create">${createDate}</span>
                    </p>
                    <p class="reciver_text">${text}</p>
                </div>
            </div>
        `;
        getEle(group_id).innerHTML += messengerContent;
    })

}