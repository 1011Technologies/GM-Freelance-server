const express = require('express');
const multer = require('multer');
const path = require("path");
// const { createUser, } = require('../../controllers/registrationController')
// const { logoutUser } = require('../../controllers/logoutController');
// const { loginUser } = require('../../controllers/loginController')
// const { freelancerData, clientData, uploadProfilePicture, updateDetail } = require('../../controllers/userController')
const controllers = require('../controllers/index');
const router = express.Router()



router.post('/signup', controllers.createUser)

router.post('/logout', controllers.logoutUser);


router.post('/login', controllers.loginUser)


router.post('/clientdata', controllers.clientData)


router.post('/freelancerdata', controllers.freelancerData)


router.post('/updatedata', controllers.updateDetail)




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

const uploadPath = path.join(__dirname, '../../uploads');
router.use('/pic', express.static(uploadPath));
router.post("/uploadprofile_photo", upload.single('profileImage'), controllers.uploadProfilePicture);







module.exports = router
