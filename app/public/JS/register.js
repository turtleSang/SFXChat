import { checkNull, checkNumber } from "./validate/validate.js"

let eleUsername = document.getElementById("username");
let elePhonenumber = document.getElementById("phone_number");
let elePassword = document.getElementById("password");

eleUsername.onblur = () => {
    let text = eleUsername.value;
    let flag = checkNull(text);
    if (!flag) {
        document.getElementById("alert_name").innerHTML = "username cannot be left blank";
        document.getElementById("alert_name").className = "alert alert-danger";
    } else {
        document.getElementById("alert_name").innerHTML = "";
        document.getElementById("alert_name").className = "";
    }
}

elePhonenumber.onblur = () => {
    let text = elePhonenumber.value;
    let contentTxt = "";

    if (!checkNull(text)) {
        contentTxt += " cannot be left blank"
    }

    if (!checkNumber(text)) {
        contentTxt += " only number"
    }

    if (contentTxt) {
        document.getElementById("alert_phone").innerHTML = "Phone Numbe" + contentTxt;
        document.getElementById("alert_phone").className = "alert alert-danger";
    } else {
        document.getElementById("alert_phone").innerHTML = "";
        document.getElementById("alert_phone").className = "";
    }
}

elePassword.onblur = () => {
    let text = elePassword.value;
    if (checkNull(text)) {
        document.getElementById("alert_password").innerHTML = "";
        document.getElementById("alert_password").className = "";
    } else {
        document.getElementById("alert_password").innerHTML = "Password cannot be left blank";
        document.getElementById("alert_password").className = "alert alert-danger";
    }
}

document.getElementById("btn_register").onclick = () => {
    let username = document.getElementById("username").value;
    let phonenumber = document.getElementById("phone_number").value;
    let password = document.getElementById("password").value;

    let flag = checkNull(username) && checkNull(phonenumber) && checkNull(password) && checkNumber(phonenumber);


    if (flag) {
        axios({
            method: 'post',
            url: '/api/v1/user/register',
            data: {
                username,
                phonenumber,
                password
            }
        }).then(res => {
            document.getElementById("nofication").innerHTML = res.data;
            document.getElementById("nofication").className = "alert alert-success text";
            document.getElementById("nofication").style.fontWeight = "bold";

            setTimeout(() => {
                window.location.replace("/index.html");
            }, 3000);

        }).catch(err => {
            document.getElementById("nofication").className = "alert alert-danger";
            document.getElementById("nofication").innerHTML = "Try fill form";
            document.getElementById("nofication").style.fontWeight = "bold";
        });
    } else {
        document.getElementById("nofication").className = "alert alert-danger";
        document.getElementById("nofication").innerHTML = "Try fill form";
        document.getElementById("nofication").style.fontWeight = "bold";
    }


}