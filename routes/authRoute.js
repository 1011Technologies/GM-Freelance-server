const express = require('express');
const { validateToken } = require('../utils/JWT');
const authControllers = require('../controllers/Auth/index');
const router = express.Router()


//ROUTES
router.get('/verify', validateToken, authControllers.auth)
router.post('/signup', authControllers.createUser)
router.post('/logout', authControllers.logoutUser);
router.post('/login', validateToken, authControllers.loginUser)

module.exports = router
