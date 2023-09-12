const express = require('express');
const multer = require('multer');
const path = require("path");
const freelancerController = require('../controllers/freelancer.controller');
const { validateToken } = require('../utils/JWT');
const router = express.Router();
const attachmentPath = path.join(__dirname, '../uploads/proposal');
router.use('/attachment', express.static(attachmentPath));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, attachmentPath)
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});
router.get('/get-freelancer-data', validateToken, freelancerController.getFreelancerData);
router.post("/submit-proposal", validateToken, upload.single('proposalAttachment'), freelancerController.submitProposal);
router.get('/get-attachment-file/:file', freelancerController.getAttachmentFile);
router.get('/get-jobs', validateToken, freelancerController.getJobs);
router.get('/get-job/:jobId',validateToken, freelancerController.getJob);
router.get('/get-client/:clientId',validateToken, freelancerController.getClient);
router.get('/get-clients',validateToken, freelancerController.getClients);
router.get('/get-applied-jobs',validateToken, freelancerController.getAppliedJobs);
router.get('/get-proposals',validateToken, freelancerController.getProposals);
router.get('/get-proposal/:jobId',validateToken, freelancerController.getProposal);
// router.get('/get-reviews-count',validateToken, freelancerController.getReviewCount);




module.exports = router;
