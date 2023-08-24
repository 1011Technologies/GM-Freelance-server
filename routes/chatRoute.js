const express = require('express');
const multer = require('multer');
const path = require("path");
const chatControllers = require('../controllers/chat/index');

const { validateToken } = require('../utils/JWT');
const router = express.Router();
router.get('/send-message', validateToken, chatControllers.sendMessage)

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
    limits: { fileSize: 1024 * 1024 * 12 },
});
const uploadPath = path.join(__dirname, '../uploads/chat');
router.use('/pic', express.static(uploadPath));
router.post("/send-attachment", validateToken, upload.array('messageAttachment'), chatControllers.sendMessage);

router.get('/get-attachment/:file', chatControllers.getAttachments);
module.exports = router
