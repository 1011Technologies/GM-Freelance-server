//SERVER FILE
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
// const { validateToken } = require('./utils/JWT');




// express app
const app = express();

const allowedOrigins = [
    'http://localhost:5174',
    'http://localhost:5173',
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



//ROUTES//
app.use('/api', userRoute);



app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
})
