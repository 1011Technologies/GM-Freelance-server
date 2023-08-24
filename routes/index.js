const express = require('express');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const chatRoute = require('./chatRoute');

const router = express();
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/chat', chatRoute);


module.exports= router