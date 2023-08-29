const clientController = require('./client.controller');
const jobPostController = require('./jobpost.controller');

module.exports = {
    getClientData: clientController.getClientData,
    saveClientData: clientController.saveClientData,
    postJob:jobPostController.postJob
};