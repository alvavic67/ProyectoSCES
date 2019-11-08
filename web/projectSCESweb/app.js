var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoCliente = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/alumnosSalle";

var {
    PORT = 3000,
    SESS_LIFETIME = 1000 * 60 * 60,
    SESS_NAME = 'sid'
} //= process.env()

var users = [
    { id:1, name: 'Alvaro Silva Peña', username: 'silva', password: '123' },
    { id:2, name: 'Esteban Mata Gómez', username: 'mata', password: 'abc' },
    { id:3, name: 'Noé Oliva González', username: 'noe', password: '456' },
]

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
    name: SESS_NAME,
    secret: 'gatitos',
    resave: false,
    saveUninitialized: false,
    //store: 
    cookie: { 
        secure: true,
        maxAge: SESS_LIFETIME,
        sameSite: true
    }
})) 

var redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

var redirectHome = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/home');
    } else {
        next();
    }
}

app.use((req, res, next) => {
    var { userId } = req.session
    if (userId) {
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})

app.get('/', (req, res) => {
    var { userId } = req.session
    res.send('/home')
})

app.get('/login', redirectHome, (req, res) => {
    req.session.userId = 
    res.send(login.html);
})

app.get('/home', redirectLogin, (req, res) => {
    var user = users.find(user => user.id === req.session.userId)
    console.log(user.name)
    console.log(user.username)
    console.log(user.password)
    res.send(home.html);
})

app.post('/login', redirectHome, (req, res) => {
    var { user, password } = req.body
    if (email && password) {
        var user = user.find(
            user => user.username === username && user.password === password
        )
    }

    if (user) {
        req.session.userId = user.id;
        return res.redirect('/home')
    }
    res.redirect('/login')
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})

app.listen(PORT, function() {
    console.log('El servidor está escuchando por el puerto 3000');
})