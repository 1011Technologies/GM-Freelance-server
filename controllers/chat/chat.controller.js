const pool = require('../../db');
const sendMessage = async (req, res) => {
    try {
        const messageDetail = req.body;

        await pool.query(
            "INSERT INTO public.message (sent_to_id, sent_from_id, proposal_id, message_text) VALUES ($1, $2, $3, $4)",
            [
                messageDetail.sent_to_id,
                req.user,
                messageDetail.proposal_id,
                messageDetail.message_text
            ]
        );

        res.status(201).json({
            message: "Message sent successfully."
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
}




module.exports = {
    sendMessage
};
