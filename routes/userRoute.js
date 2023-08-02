const express = require('express');
const multer = require('multer');
const path = require("path");
const controllers = require('../controllers/index');
const { validateToken } = require('../utils/JWT');
const router = express.Router()



router.get('/getuser', validateToken, controllers.userDetail)
router.post('/clientdata', controllers.clientData)
router.post('/freelancerdata', controllers.freelancerData)
router.put('/updatedata', validateToken, controllers.updateDetail)




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
