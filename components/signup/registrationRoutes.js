const express = require('express')

const
    {
        createUser,
    } = require('../../controllers/registrationController')

const router = express.Router()

router.post('/signup', createUser)


module.exports = router
