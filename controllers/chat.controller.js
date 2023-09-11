// messageController.js
const messageService = require('./messageService');


//SEND MESSEGE
async function sendMessage(req, res) {
    try {
        const { sent_to_id, proposal_id, message_text } = req.body;
        const sent_from_id = req.user;
        const result = await messageService.sendMessage(sent_to_id, sent_from_id, proposal_id, message_text);
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
    sendMessage,
    getAttachments
};