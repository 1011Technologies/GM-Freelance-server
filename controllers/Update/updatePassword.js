
const pool = require('../../db');


const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query("BEGIN");
        await pool.query(
            `UPDATE users 
            SET 
              password=$1
            WHERE user_id = $2`,
            [hashedPassword, req.user]
        );
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }

}


module.exports = { updatePassword }
