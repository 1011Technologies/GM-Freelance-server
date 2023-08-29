const sharedController = require('./shared/user.controller');
const freelancerController = require('./freelancer/freelancer.controller');
const clientController = require('./client/index');

module.exports = {
    getUserDetail: sharedController.getUserDetail,
    deleteProfile: sharedController.deleteProfile,
    getProfilePic: sharedController.getProfilePic,
    freelancerData: freelancerController.freelancerData,
    getClientData: clientController.getClientData,
    saveClientData: clientController.saveClientData,
    postJob: clientController.postJob
};