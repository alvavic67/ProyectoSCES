//var socket = io('http://localhost:3000');
//import { iniciarSesion } from '../../bin/db/db';
//var iniciarSesion = require(db.js);

var user = document.getElementById('txt_user');
var password = document.getElementById('txt_password');
var button_login = document.getElementById('button_login');

button_login.onclick = function () {
    console.log(user.value);
    console.log(password.value);
    //socket.emit('login', {
      //  user: user.value,
        //password: password.value
    //});
    window.location.href = "../../views/home.html"
};