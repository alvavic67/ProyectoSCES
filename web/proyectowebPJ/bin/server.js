var io = require('socket.io')();
var iniciarSesion = require('./db/db');

io.sockets.on('connection', function(socket){

	console.log("UN NUEVO CLIENTE CONECTADO CON EL SOCKET ID: " + socket.id);
	//AQUI COLOCAREMOS TODOS NUESTROS EVENTOS DE TIPO socket.on

	io.on('login', (data) => {
		iniciarSesion(data.user, data.password);
	})

}); 

	//AQUI COLOCAREMOS TODOS NUESTROS EVENTOS DE TIPO io.sockets.emit


    
	module.exports = io;