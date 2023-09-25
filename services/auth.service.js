// userService.js
const pool = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/JWT');

//LOGIN SERVICE
async function login(email, password) {
    try {
        const exist = await pool.query(
            "SELECT * FROM users WHERE email = $1 ",
            [email]
        );

        if (exist.rows.length > 0) {
            const user = exist.rows[0];
            const passwordMatch = await checkPassword(password, user.password);

            if (passwordMatch) {
                return generateToken(user.user_id);
            } else {
                throw new Error("Incorrect Password.");
            }
        } else {
            throw new Error("User doesn't exist.");
        }
    } catch (err) {
        throw err;
    }
}
async function checkPassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

//SIGN UP SERVICE
async function register(userDetail) {
    try {
        const alreadyRegistered = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND user_type=$2",
            [
                userDetail.email,
                userDetail.user_type,
            ]
        );

        if (alreadyRegistered.rowCount === 0) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(userDetail.password, salt);
            const newUser = await pool.query(
                `INSERT INTO users (first_name, last_name, email, password, gender, phone_no, user_type)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
                [
                    userDetail.first_name,
                    userDetail.last_name,
                    userDetail.email,
                    hashedPassword,
                    userDetail.gender,
                    userDetail.phone_no,
                    userDetail.user_type,
                ]
            );

            let newEntity;

            if (newUser.rows[0].user_type === 'Client') {
                newEntity = await pool.query(
                    `INSERT INTO client (user_id) VALUES ($1) RETURNING *;`,
                    [
                        newUser.rows[0].user_id,
                    ]
                );
            } else if (newUser.rows[0].user_type === 'Freelancer') {
                newEntity = await pool.query(
                    `INSERT INTO freelancer (user_id) VALUES ($1) RETURNING *;`,
                    [
                        newUser.rows[0].user_id,
                    ]
                );
                certification = await pool.query(
                    `INSERT INTO certification (freelancer_id) VALUES ($1) RETURNING *;`,
                    [
                        newEntity.rows[0].freelancer_id,
                    ]
                );
            }

            const token = generateToken(newUser.rows[0].user_id);

            return {
                token,
                status: "User registered successfully.",
            };
        } else {
            throw new Error("Already registered.");
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    login,
    register
};
