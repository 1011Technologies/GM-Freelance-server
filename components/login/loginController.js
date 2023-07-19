const pool = require('../../db');
const bcrypt = require('bcrypt');
const session = require('express-session');
//
const loginUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const exist = await pool.query(
            "SELECT * FROM users WHERE email = $1  AND user_type=$2",
            [
                userDetail.email,
                userDetail.user_type,
            ]
        );
        if (exist.rows.length > 0) {
            const user = exist.rows[0];
            const passwordMatch = await checkPassword(userDetail.password, user.password);

            if (passwordMatch) {
                // Store user information in the session
                req.session.user = {
                    user_id: user.user_id,
                    email: user.email,
                    user_type: user.user_type,
                    email: user.email,
                    gender: user.gender,
                    phone_no: user.phone_no,
                    postal_code: user.postal_code,
                    geom: user.geom
                };
                res.status(200).json({
                    status: "Login Successful",
                    user: req.session.user, // Send the session information in the response
                });
            } else {
                res.status(400).json({
                    error: "Incorrect Password.",
                });
            }
        }
        else {
            res.status(400).json({
                error: "User does'nt exist.",
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};


 async function checkPassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}




module.exports = {
    loginUser,
};
