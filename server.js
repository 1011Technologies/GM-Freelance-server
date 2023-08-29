//SERVER FILE
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const index = require('./routes/index');
// express app
const app = express();
const allowedOrigins = [
    'https://git.heroku.com/gigmate.git',
    'http://localhost:3000',
];
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        key: "user_id",
        secret: 'gm_gigmeta',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 72
        }
    })
);
const herokuApiKey = process.env.HEROKU_API_KEY;

//ROUTES
app.use('/api', index);
const server = app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
})

//SOCKETS
const { validateToken } = require('./utils/JWT');
const io = require('socket.io')(server);
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await validateToken(token);
        socket.userid = payload.userid;
        next();
    } catch (error) {
        console.error("Socket authentication error:", error);
        socket.disconnect(true);
    }
})

io.on('connection', (socket) => {
    console.log("Connected:" + socket.userid)
    socket.on('disconnect', () => {
        console.log("Disconnected:" + socket.userid)

    })
})
