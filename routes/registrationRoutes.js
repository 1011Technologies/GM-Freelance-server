const express = require('express')

const
    {
        createUser
    } = require('../controller/registrationController')

const router = express.Router()

router.post('/signup', createUser)

module.exports = router
