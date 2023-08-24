const express = require('express');
const multer = require('multer');
const path = require("path");
const userControllers = require('../controllers/users/index');
const updateControllers = require('../controllers/update/index');
const { validateToken } = require('../utils/JWT');
const router = express.Router();
router.get('/profile', validateToken, userControllers.getUserDetail)
router.post('/client-data', validateToken, userControllers.clientData)
router.post('/freelancer-data', validateToken, userControllers.freelancerData)
router.put('/update-profile', validateToken, updateControllers.updateUserDetail)
router.put('/update-password', validateToken, updateControllers.updatePass)
//PICTURE UPLOAD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1 MB limit
});
const uploadPath = path.join(__dirname, '../uploads/profile-picture');
router.use('/pic', express.static(uploadPath));
router.put("/update-profile-picture", validateToken, upload.single('profileImage'), updateControllers.updateProfilePic);
router.get('/get-profile-picture/:file', userControllers.getProfilePic);
module.exports = router
