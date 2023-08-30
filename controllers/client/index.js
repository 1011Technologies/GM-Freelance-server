const clientController = require('./client.controller');

module.exports = {
    getClientData: clientController.getClientData,
    saveClientData: clientController.saveClientData,
    postJob:clientController.postJob
};