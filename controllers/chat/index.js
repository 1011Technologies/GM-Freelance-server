const chatControllers = require('./chat.controller');

module.exports = {
    sendMessage:chatControllers.sendMessage,
    getAttachments: chatControllers.getAttachments
  };
  