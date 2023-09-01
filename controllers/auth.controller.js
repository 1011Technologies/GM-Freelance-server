const pool = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/JWT');

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

//SIGN UP
const createUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const alreadyregistered = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND user_type=$2",
            [
                userDetail.email,
                userDetail.user_type,
            ]
        );
        if (alreadyregistered.rowCount == 0) {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(userDetail.password, salt);
            const newUser = await pool.query(
                `INSERT INTO users (first_name, last_name, email, password, gender, phone_no, user_type)
                    VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *;`,
                [
                    userDetail.first_name,
                    userDetail.last_name,
                    userDetail.email,
                    hashedPassword,
                    userDetail.gender,
                    userDetail.phone_no,
                    userDetail.user_type
                ]
            );
            if (newUser.rows[0].user_type == 'Client') {
                newclient = await pool.query(
                    `INSERT INTO client (user_id) VALUES ($1) RETURNING *;`,
                    [
                        newUser.rows[0].user_id
                    ]
                )
            }
            else if (newUser.rows[0].user_type == 'Freelancer') {
                newFreelancer = await pool.query(
                    `INSERT INTO freelancer (user_id) VALUES ($1) RETURNING *;`,
                    [
                        newUser.rows[0].user_id
                    ]
                )
            }
            const token = generateToken(newUser.rows[0].user_id)

            res
                .status(200)
                .json({
                    token,
                    status: "User registered successfully.",
                });
        }
        else {
            res
                .status(400)
                .json({
                    error: "Already registered.",
                });
        }

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: "Server error" });
    }
}

const logoutUser = async (req, res) => {
    req.session.destroy();
    res.send("Logged out");

}

module.exports = {
    loginUser, createUser, logoutUser
};
