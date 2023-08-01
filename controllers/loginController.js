const pool = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/JWT');
const session = require('express-session');




const loginUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const exist = await pool.query(
            "SELECT * FROM users WHERE email = $1 ",
            [
                userDetail.email,
            ]
        );
        if (exist.rows.length > 0) {
            const user = exist.rows[0];
            const passwordMatch = await checkPassword(userDetail.password, user.password);

            if (passwordMatch) {
                const token = generateToken(user.user_id)
                res.json({ token })
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
