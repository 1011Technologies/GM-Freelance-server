const express = require('express');
const authControllers = require('../controllers/auth.controller');
const router = express.Router()
//ROUTES
router.post('/sign-up', authControllers.createUser);
router.post('/log-out', authControllers.logoutUser);
router.post('/log-in', authControllers.loginUser);
module.exports = router
