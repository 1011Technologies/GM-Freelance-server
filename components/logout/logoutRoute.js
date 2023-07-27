const express = require('express')
const { logoutUser } = require('../../controllers/logoutController');

const router = express.Router();


router.post('/destroy', logoutUser);

module.exports = router