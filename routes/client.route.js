const express = require('express');
const multer = require('multer');
const path = require("path");
const clientController = require('../controllers/client');
const { validateToken } = require('../utils/JWT');
const router = express.Router();


router.post('/update-client-data', validateToken, clientController.saveClientData);
router.post('/get-client-data', validateToken, clientController.getClientData);
router.post('/post-job', validateToken, clientController.postJob);

module.exports = router
