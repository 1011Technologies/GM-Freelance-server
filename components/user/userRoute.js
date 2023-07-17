const express = require('express')
const
    {
        freelancerData,
        clientData
    } = require('./userController')
const router = express.Router()


router.post('/clientdata', clientData)
router.post('/freelancerdata', freelancerData)

module.exports = router
