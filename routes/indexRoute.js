const express = require('express');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const router = express();


router.use('/auth', authRoute);
router.use('/user', userRoute);

module.exports= router