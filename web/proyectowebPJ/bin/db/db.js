/* Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/scec", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }

  var usuarios = db.collection('usuarios');

  var iniciarSesion = function(usuario, contraseña) {
      var response = usuarios.find({user: usuario, password: contraseña});

      if(response.length != 0) {
          alert('Si entró');
      }
  }
});

*///exports.iniciarSesion = iniciarSesion;
//module.exports = iniciarSesion;