const updatePassController = require('./updatePassword.controller');
const updateDetailsController = require('./updateUserDetails.controller');
const updateProfilePictureController = require('./updateProfilePicture.controller');

module.exports = {
    updatePass: updatePassController.updatePassword,
    updateUserDetail: updateDetailsController.updateDetail,
    updateProfilePic: updateProfilePictureController.uploadProfilePicture,
};