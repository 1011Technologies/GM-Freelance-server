// index.js

const registrationController = require('./registrationController');
const logoutController = require('./logoutController');
const loginController = require('./loginController');
const userController = require('./userController');

module.exports = {
  createUser: registrationController.createUser,
  logoutUser: logoutController.logoutUser,
  loginUser: loginController.loginUser,
  freelancerData: userController.freelancerData,
  clientData: userController.clientData,
  uploadProfilePicture: userController.uploadProfilePicture,
  updateDetail: userController.updateDetail,
};
