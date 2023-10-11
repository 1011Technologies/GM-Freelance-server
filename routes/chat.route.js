const express = require('express');
const multer = require('multer');
const path = require("path");
const chatControllers = require('../controllers/chat.controller');
const { validateToken } = require('../utils/JWT');
const router = express.Router();

router.post('/create-room', validateToken, chatControllers.createChatRoom);
router.delete('/delete-room/:chatRoomId', validateToken, chatControllers.deleteChatRoom);
router.get('/send-message', validateToken, chatControllers.sendMessage);

// router.get('/get-messages', validateToken, chatControllers.getMessage)
// router.post('/create-group', validateToken, chatControllers.createGroupChat)
// router.put('/rename-group', validateToken, chatControllers.renameGroup)
// router.put('/remove-from-group', validateToken, chatControllers.removeFromGroup)
// router.put('/add-in-group', validateToken, chatControllers.addInGroup)






//PICTURE UPLOAD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 12 },
});
const uploadPath = path.join(__dirname, '../uploads/chat');
router.use('/pic', express.static(uploadPath));
// router.post("/send-attachment", validateToken, upload.array('messageAttachment'), chatControllers.accessChat);
router.get('/get-attachment/:file', chatControllers.getAttachments);
module.exports = router
