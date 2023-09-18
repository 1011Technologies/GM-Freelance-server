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
router.post('/recenlty-viewed', validateToken, clientController.addRecentView);
router.get('/get-recently-viewed',validateToken, clientController.getRecent);
router.get('/get-bookmarked-freelancers',validateToken, clientController.getBookmarkedFreelancers);


module.exports = router
