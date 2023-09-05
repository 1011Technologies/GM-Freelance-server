//SERVER FILE
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const index = require('./routes');
// express app
const port = process.env.PORT;

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
//ROUTES
app.use('/api', index);
const server = app.listen(port, () => {
    console.log('listening for requests on port', process.env.PORT)
})

// //SOCKETS
// const { validateToken } = require('./utils/JWT');
// const io = require('socket.io')(server);
// io.use(async (socket, next) => {
//     try {
//         const token = socket.handshake.query.token
//         const payload = await validateToken(token);
//         socket.userid = payload.userid;
//         next();
//     } catch (error) {
//         console.error("Socket authentication error:", error);
//         socket.disconnect(true);
//     }
// })

// io.on('connection', (socket) => {
//     console.log("Connected:" + socket.userid)
//     socket.on('disconnect', () => {
//         console.log("Disconnected:" + socket.userid)

//     })
// })
