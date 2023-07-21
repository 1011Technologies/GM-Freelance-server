//SERVER FILE
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const registerRoute = require('.//components/signup/registrationRoutes');
const loginRoute = require('./components/login/loginRoute');
const userRoute = require('./components/user/userRoute');
const logoutRoute = require('./components/logout/logoutRoute');



// express app
const app = express();

// middleware
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5174"],
        methods: ["GET", "POST"],
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
app.use('/userdetail', registerRoute)
app.use('/logindetail', loginRoute)
app.use('/user', userRoute)
app.use('/logout', logoutRoute)



app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
})
