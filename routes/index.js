const express = require('express');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const router = express();
router.use('/auth', authRoute);
router.use('/users', userRoute);

module.exports= router