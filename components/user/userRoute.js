const express = require('express');
const multer = require('multer');
const path = require("path");
const { freelancerData, clientData, uploadProfilePicture } = require('./userController')
const router = express.Router()

router.post('/clientdata', clientData)
router.post('/freelancerdata', freelancerData)



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
})

const uploadPath = path.join(__dirname, '../../uploads');
router.use('/pic', express.static(uploadPath));
router.post("/uploadprofile_photo", upload.single('profileImage'), uploadProfilePicture);



module.exports = router
