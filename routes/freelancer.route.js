const express = require('express');
const multer = require('multer');
const path = require("path");
const freelancerController = require('../controllers/users/index');
const { validateToken } = require('../utils/JWT');
const router = express.Router();


router.post('/freelancer-data', validateToken, freelancerController.freelancerData)
module.exports = router
