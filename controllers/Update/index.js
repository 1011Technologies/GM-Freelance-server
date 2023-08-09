const updatePassController = require('./updatePassword');
const updateDetailsController = require('./updateUserDetails');
const updateProfilePictureController = require('./updateProfilePicture');

module.exports = {
    updatePass: updatePassController.updatePassword,
    updateUserDetail: updateDetailsController.updateDetail,
    updateProfilePic: updateProfilePictureController.uploadProfilePicture,
};