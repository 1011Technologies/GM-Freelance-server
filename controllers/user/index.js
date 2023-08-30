const userController = require('./user.controller');

module.exports = {
    getUserDetail: userController.getUserDetail,
    deleteProfile: userController.deleteProfile,
    getProfilePic: userController.getProfilePic,
    updateDetail: userController.updateDetail,
    updatePassword: userController.updatePassword,
    uploadProfilePicture: userController.uploadProfilePicture,

};