
const registrationController = require('./registrationController');
const logoutController = require('./logoutController');
const loginController = require('./loginController');
const userController = require('./userController');
const authController = require('./authController');
const userDetailController = require('./userDetailController');



module.exports = {
  auth:authController.auth,
  userDetail:userDetailController.getUserDetail,
  createUser: registrationController.createUser,
  logoutUser: logoutController.logoutUser,
  loginUser: loginController.loginUser,
  freelancerData: userController.freelancerData,
  clientData: userController.clientData,
  uploadProfilePicture: userController.uploadProfilePicture,
  updateDetail: userController.updateDetail,
};
