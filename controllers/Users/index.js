const userController = require('./userController');
const userDetailController = require('./userDetailController');
module.exports = {
    userDetail: userDetailController.getUserDetail,
    userProfilePicture: userDetailController.getProfilePic,
    freelancerData: userController.freelancerData,
    clientData: userController.clientData

};