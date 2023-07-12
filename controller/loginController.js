const pool = require('../db.js');
// const session = require('express-session');

const loginUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const exist = await pool.query(
            "SELECT * FROM users WHERE user_name=$1 OR email = $2  AND password = $3 AND user_type=$4",
            [
                userDetail.user_name,
                userDetail.email,
                userDetail.password,
                userDetail.user_type,
            ]
        );
        if (exist) {
            console.log(exist);
            // req.session.userId = exist.userId; // Store the user ID in the session
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
