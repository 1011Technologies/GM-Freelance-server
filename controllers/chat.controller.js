// messageController.js
const chatService = require('../services/chat.service');

//CREATE CHAT ROOM
async function createChatRoom(req, res) {
    try {
        const { sent_to_id, proposal_id, message_text } = req.body;
        const sent_from_id = req.user;
        const result = await chatService.createChatRoom(sent_to_id, sent_from_id, proposal_id, message_text);
        res.status(201).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// DELETE CHAT ROOM
async function deleteChatRoom(req, res) {
    try {
        const { chatRoomId } = req.params;
        await chatService.deleteChatRoom(chatRoomId); // Call your service function to delete the chat room
        res.status(200).json({ message: 'Chat Room Deleted.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

//SEND MESSEGE
async function sendMessage(req, res) {
    try {
        const { chat_room_id, sent_to_id, proposal_id, message_text } = req.body;
        const sent_from_id = req.user;
        const result = await chatService.sendMessage(sent_to_id, sent_from_id, proposal_id, message_text, chat_room_id);
        io.to(sent_to_id).emit('newMessage', {
            sent_from_id,
            proposal_id,
            message_text,
        });
        res.status(201).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// NO FILE OF GET ATTACHMENT IS AVAILABLE IN CHAT SERVICES
const getAttachments = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', 'uploads', 'chat', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "image not available" });
    }
};

module.exports = {
    createChatRoom,
    sendMessage,
    getAttachments,
    deleteChatRoom
};