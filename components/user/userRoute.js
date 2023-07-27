const express = require('express');
const multer = require('multer');
const path = require("path");
const { createUser, } = require('../../controllers/registrationController')
const { logoutUser } = require('../../controllers/logoutController');
const { loginUser } = require('../../controllers/loginController')
const { freelancerData, clientData, uploadProfilePicture, updateDetail } = require('../../controllers/userController')
const router = express.Router()



router.post('/signup', createUser)

router.post('/logout', logoutUser);


router.post('/login', loginUser)


router.post('/clientdata', clientData)


router.post('/freelancerdata', freelancerData)


router.post('/updatedata', updateDetail)




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
router.post("/uploadprofile_photo", upload.single('profileImage'), uploadProfilePicture);







module.exports = router
