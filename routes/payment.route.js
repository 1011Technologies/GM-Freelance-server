const express = require('express');
const multer = require('multer');
const path = require("path");
const paymentControllers = require('../controllers/payment.controller');
const { validateToken } = require('../utils/JWT');
const router = express.Router();

router.get('/paypal', paymentControllers.config);
module.exports = router
