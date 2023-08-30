const express = require('express');
const multer = require('multer');
const path = require("path");
const freelancerController = require('../controllers/freelancer');
const { validateToken } = require('../utils/JWT');
const router = express.Router();

router.get('/get-freelancer-data', validateToken, freelancerController.getFreelancerController)
module.exports = router
