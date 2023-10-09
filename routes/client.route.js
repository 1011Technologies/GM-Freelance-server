const express = require('express');
const clientController = require('../controllers/client.controller');
const { validateToken } = require('../utils/JWT');
const router = express.Router();

router.post('/add-bookmark',validateToken, clientController.addBookmark);
router.delete('/remove-bookmark',validateToken, clientController.deleteBookmark);
router.get('/get-bookmarks',validateToken, clientController.getBookmarks);

router.post('/post-job', validateToken, clientController.postJob);
router.get('/get-client-data', validateToken, clientController.getClientData);
router.get('/get-freelancers',validateToken, clientController.getFreelancers);
router.get('/get-freelancer/:freelancerId',validateToken, clientController.getFreelancer);
router.put('/update-client-data', validateToken, clientController.updateClientData);
router.post('/add-recently-viewed', validateToken, clientController.addRecentView);
router.get('/get-recently-viewed',validateToken, clientController.getRecent);
router.get('/get-bookmarked-freelancers',validateToken, clientController.getBookmarkedFreelancers);
router.get('/get-rising-stars',validateToken, clientController.getRisingStars);
router.get('/get-your-hires',validateToken, clientController.getYourHires);
router.get('/get-jobs',validateToken, clientController.getMyJobs);
router.get('/get-job/:jobId',validateToken, clientController.getJob);
router.get('/get-job-proposals/:jobId',validateToken, clientController.getJobProposals);
router.get('/get-proposal/:proposalId',validateToken, clientController.getProposal);
router.put('/accept-proposal',validateToken, clientController.acceptProposal);
router.put('/reject-proposal',validateToken, clientController.rejectProposal);


module.exports = router
