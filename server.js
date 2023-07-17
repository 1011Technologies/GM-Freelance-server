
//SERVER FILE

require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const registerRoute = require('.//components/signup/registrationRoutes');
const loginRoute = require('./components/login/loginRoute');
const userRoute = require('./components/user/userRoute');
const logoutRoute = require('./components/logout/logoutRoute');



// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
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
