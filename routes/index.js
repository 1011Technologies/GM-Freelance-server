const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const chatRoute = require('./chat.route');
const clientRoute= require('./client.route')
const freelancerRoute= require('./freelancer.route')

const router = express();
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/chat', chatRoute);
router.use('/client', clientRoute);
router.use('/freelancer', freelancerRoute);



module.exports= router