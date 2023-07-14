
// SERVER FILE

require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const registerRoute = require('./routes/registrationRoutes.js');
const loginRoute = require('./routes/loginRoute.js');
const userRoute = require('./routes/userRoute.js');
const logoutRoute = require('./routes/logoutRoute.js');



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
