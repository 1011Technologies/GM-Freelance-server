const pool = require('../../db');
const session = require('express-session');

const loginUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const exist = await pool.query(
            "SELECT * FROM users WHERE email = $1  AND password = $2 AND user_type=$3",
            [
                userDetail.email,
                userDetail.password,
                userDetail.user_type,
            ]
        );
        if (exist) {
            const user = exist.rows[0]; // Assuming the first row represents the user data
            // req.session.user = user; // Store the user data in the session
            console.log(user);
            res.send("Login successful");
        } else {
            res.status(400).json({
                error: "Incorrect Password.",
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    loginUser,
};
