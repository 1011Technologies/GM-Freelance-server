
const registrationController = require('./registrationController');
const logoutController = require('./logoutController');
const loginController = require('./loginController');
const userController = require('./userController');
const authController = require('./authController');


module.exports = {
  auth:authController.auth,
  createUser: registrationController.createUser,
  logoutUser: logoutController.logoutUser,
  loginUser: loginController.loginUser,
  freelancerData: userController.freelancerData,
  clientData: userController.clientData,
  uploadProfilePicture: userController.uploadProfilePicture,
  updateDetail: userController.updateDetail,
};
