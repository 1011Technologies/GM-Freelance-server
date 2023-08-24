const chatControllers = require('./chat.controller');
const getChatControllers = require('./getchat.controller');

module.exports = {
    sendMessage:chatControllers.sendMessage,
    getAttachments: getChatControllers.getAttachments
  };
  