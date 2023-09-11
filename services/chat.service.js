// messageService.js
const pool = require('../db');

//SEND MESSEGE
async function sendMessage(sentToId, sentFromId, proposalId, messageText) {
    try {
        await pool.query(
            'INSERT INTO public.message (sent_to_id, sent_from_id, proposal_id, message_text) VALUES ($1, $2, $3, $4)',
            [sentToId, sentFromId, proposalId, messageText]
        );

        return { message: 'Message sent successfully.' };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMessage,
};
