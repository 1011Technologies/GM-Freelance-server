const userController = require('./userController');
const userDetailController = require('./userDetailController');
module.exports = {
    getUserDetail: userDetailController.getUserDetail,
    getProfilePic: userDetailController.getProfilePic,
    freelancerData: userController.freelancerData,
    clientData: userController.clientData

};