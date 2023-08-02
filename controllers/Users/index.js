
const userController = require('./userController');
const userDetailController = require('./userDetailController');




module.exports = {
    userDetail: userDetailController.getUserDetail,
    freelancerData: userController.freelancerData,
    clientData: userController.clientData,
    uploadProfilePicture: userController.uploadProfilePicture,
    updateDetail: userController.updateDetail,
};