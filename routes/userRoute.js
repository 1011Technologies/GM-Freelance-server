const express = require('express');
const multer = require('multer');
const path = require("path");
const userControllers = require('../controllers/Users/index');
const updateControllers = require('../controllers/Update/index');
const { validateToken } = require('../utils/JWT');
const router = express.Router()



router.get('/profile', validateToken, userControllers.userDetail)
router.post('/clientdata', validateToken, userControllers.clientData)
router.post('/freelancerdata', validateToken, userControllers.freelancerData)
router.put('/updateprofile', validateToken, updateControllers.updateUserDetail)
router.put('/updatepassword', validateToken, updateControllers.updatePass)





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
})

const uploadPath = path.join(__dirname, '../uploads');
router.use('/pic', express.static(uploadPath));
router.post("/uploadprofilepicture", validateToken, upload.single('profileImage'), updateControllers.updateProfilePic);







module.exports = router
