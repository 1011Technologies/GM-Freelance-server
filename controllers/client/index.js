const clientController = require('./client.controller');

module.exports = {
    getClientData: clientController.getClientData,
    updateClientData: clientController.updateClientData,
    postJob:clientController.postJob
};