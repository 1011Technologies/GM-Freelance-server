const express = require('express');
const authControllers = require('../controllers/auth/index');
const router = express.Router()
//ROUTES
router.post('/sign-up', authControllers.createUser)
router.post('/sign-out', authControllers.logoutUser);
router.post('/sign-in', authControllers.loginUser)
module.exports = router
