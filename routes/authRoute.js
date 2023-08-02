const express = require('express');
const { validateToken } = require('../utils/JWT');
const authControllers = require('../controllers/Auth/');
const router = express.Router()


//ROUTES
router.get('/verify', validateToken, authControllers.auth)
router.post('/signup', validateToken, authControllers.createUser)
router.post('/logout', authControllers.logoutUser);
router.post('/login', validateToken, authControllers.loginUser)

module.exports = router
