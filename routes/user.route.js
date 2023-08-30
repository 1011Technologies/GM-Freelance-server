const express = require('express');
const multer = require('multer');
const path = require("path");
const userControllers = require('../controllers/user.controller');
const { validateToken } = require('../utils/JWT');
const router = express.Router();
router.get('/get-profile', validateToken, userControllers.getUserDetail)
router.put('/update-profile', validateToken, userControllers.updateDetail)
router.put('/update-password', validateToken, userControllers.updatePassword)
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
const uploadPath = path.join(__dirname, '../uploads/profilepicture');
router.use('/pic', express.static(uploadPath));
router.put("/update-profile-picture", validateToken, upload.single('profileImage'), userControllers.uploadProfilePicture);
router.get('/get-profile-picture/:file', userControllers.getProfilePic);
router.get('/delete-account', userControllers.deleteProfile);

module.exports = router
