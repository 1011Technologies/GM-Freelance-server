
const registrationController = require('./registrationController');
const logoutController = require('./logoutController');
const loginController = require('./loginController');
const authController = require('./authController');
module.exports = {
  auth:authController.auth,
  createUser: registrationController.createUser,
  logoutUser: logoutController.logoutUser,
  loginUser: loginController.loginUser,
};
