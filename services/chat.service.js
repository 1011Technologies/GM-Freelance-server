
const pool = require('../db');

//CREATE CHAT ROOM
async function createChatRoom(proposalId) {
    try {
        createdroom = await pool.query(
            'INSERT INTO chat_room (proposal_id) VALUES ($1) RETURNING*',
            [proposalId ? proposalId : null]
        );
        return { message: 'Chat Room Created .', room: createdroom.rows[0].chat_room_id };
    } catch (error) {
        throw error;
    }
}

//DELETE CHAT ROOM
async function deleteChatRoom(chatRoomId) {
    try {
        await pool.query(
            'DELETE FROM chat_room WHERE chat_room_id = $1',
            [chatRoomId]
        );
        return { message: 'Chat Room Deleted.' };
    } catch (error) {
        throw error;
    }
}


//SEND MESSEGE
async function sendMessage(sentToId, sentFromId, proposalId, messageText, chat_room_id) {
    try {
        await pool.query(
            'INSERT INTO public.message (sent_to_id, sent_from_id, proposal_id, message_text, chat_room_id) VALUES ($1, $2, $3, $4)',
            [sentToId, sentFromId, proposalId, messageText, chat_room_id]
        );
        return { message: 'Message sent successfully.' };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMessage,
    createChatRoom,
    deleteChatRoom
};
