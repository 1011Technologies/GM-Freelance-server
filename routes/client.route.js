const express = require('express');
const multer = require('multer');
const path = require("path");
const clientController = require('../controllers/client.controller');
const { validateToken } = require('../utils/JWT');
const router = express.Router();


router.put('/update-client-data', validateToken, clientController.updateClientData);
router.get('/get-client-data', validateToken, clientController.getClientData);
router.post('/post-job', validateToken, clientController.postJob);
router.get('/get-freelancers',validateToken, clientController.getFreelancers);
router.get('/get-freelancer/:freelancerId',validateToken, clientController.getFreelancer);


module.exports = router
