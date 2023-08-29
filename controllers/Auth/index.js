
const registrationController = require('./registration.controller');
const logoutController = require('./logout.controller');
const loginController = require('./login.controller');
const authController = require('./auth.controller');
module.exports = {
  auth:authController.auth,
  createUser: registrationController.createUser,
  logoutUser: logoutController.logoutUser,
  loginUser: loginController.loginUser,
};
