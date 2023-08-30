
const authController = require('./auth.controller');
module.exports = {
  auth:authController.auth,
  createUser: authController.createUser,
  logoutUser: authController.logoutUser,
  loginUser: authController.loginUser,
};
