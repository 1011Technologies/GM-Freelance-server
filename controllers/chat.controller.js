const pool = require('../db');
const sendMessage = async (req, res) => {
    try {
        const { sent_to_id, proposal_id, message_text } = req.body;

        await pool.query(
            "INSERT INTO public.message (sent_to_id, sent_from_id, proposal_id, message_text) VALUES ($1, $2, $3, $4)",
            [
                sent_to_id,
                req.user,
                proposal_id,
                message_text
            ]
        );

        // Emit the new message to the recipient using socket.io
        io.to(sent_to_id).emit('newMessage', {
            sent_from_id: req.user,
            proposal_id,
            message_text
        });

        res.status(201).json({
            message: "Message sent successfully."
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
}

const getAttachments = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', '..', 'uploads', 'chat', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "image not available" });
    }
};

module.exports = {
    sendMessage, getAttachments
};