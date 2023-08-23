const pool = require('../../db');
const path = require('path');
const fs = require('fs').promises;


const getUserDetail = async (req, res) => {
    try {
        await pool.query('BEGIN');

        const result = await pool.query(
            'SELECT * FROM users WHERE user_id=$1',
            [req.user]
        );
        if (result.rows.length > 0) {
            const userDetails = result.rows[0];
            await pool.query('COMMIT');
            return res.status(200).json(userDetails);
        } else {
            await pool.query('ROLLBACK');
            return res.status(400).json({ error: 'User not found' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};


const getProfilePic = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "image not available" });
    }
};

module.exports = { getUserDetail, getProfilePic }