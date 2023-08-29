const pool = require('../../db');
const bcrypt = require('bcrypt'); // Ensure you have this imported

const updatePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;

        // Fetch the user's stored hashed password from the database
        const result = await pool.query("SELECT password FROM users WHERE user_id = $1", [req.user]);
        const storedHashedPassword = result.rows[0].password;

        // Check if the current password matches the stored password
        const isMatch = await bcrypt.compare(current_password, storedHashedPassword);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        // If the current password is correct, hash the new password and update it in the database
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(new_password, salt);

        await pool.query("BEGIN");
        await pool.query(
           "UPDATE users  SET password=$1 WHERE user_id = $2",
            [hashedPassword, req.user]
        );

        await pool.query('COMMIT');
        res.status(200).json({ success: true, message: 'Password updated successfully.' });

    } catch (error) {
        await pool.query('ROLLBACK');

        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

module.exports = { updatePassword }