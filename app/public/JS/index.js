let token = document.cookie.split("=")[1];

if (token) {
    axios({
        method: 'get',
        url: '/api/v1/user/verify',
        headers: {
            token
        }
    }).then(res => {
        if (res.data) {
            window.location.replace("/chat.html")
        }
    }).catch(err => {
       document.getElementById("nofi").innerHTML = "You must login";
       document.getElementById("nofi").className = "alert alert-danger";
       console.log(err);
    });
}
document.getElementById("btn_login").onclick = () => {
    const phonenumber = document.getElementById('phonenumber').value;
    const password = document.getElementById('password').value;
    axios({
        method: 'post',
        url: '/api/v1/user/login',
        data: {
            phonenumber,
            password
        }
    }).then(res => {
        let { status, token } = res.data;
        if (status) {
            document.cookie = `token = ${token}`;
            window.location.replace("/chat.html")
        }
    }).catch(err => {
        console.log(err.response);
    });
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.querySelector('#btn_login').click();
    }
});


