const express = require('express');
const controllers = require('../controllers/index');
const { validateToken } = require('../utils/JWT');
const router = express.Router()


//ROUTES
router.get('/is-verified', validateToken, controllers.auth)
router.post('/signup', validateToken, controllers.createUser)
router.post('/logout', controllers.logoutUser);
router.post('/login', validateToken, controllers.loginUser)

module.exports = router
