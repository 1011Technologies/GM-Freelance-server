const pool = require('../../db');
const bcrypt = require('bcrypt');

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

            if (
                userDetail.password == userDetail.cpassword &&
                userDetail.password.length >= 8 &&
                /[!@#$%^&*(),.?":{}|<>]/g.test(userDetail.password)
            ) {

                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(userDetail.password, salt);
                await pool.query(
                    `INSERT INTO users (first_name, last_name, email, password, gender, phone_no, user_type)
                    VALUES ($1, $2, $3, $4, $5, $6,$7);`,
                    [
                        userDetail.first_name,
                        userDetail.last_name,
                        userDetail.email,
                        hashedPassword,
                        userDetail.gender,
                        userDetail.phone_no,
                        userDetail.user_type
                        // userDetail.city,
                        // userDetail.town,
                        // userDetail.street,
                        // userDetail.house_no,
                        // userDetail.postal_code,
                        // userDetail.latitude,
                        // userDetail.longitude

                    ]
                );
                res.send("User registered successfully");
            }
            else {
                res
                    .status(400)
                    .json({
                        error: "Password and confirm password do not match, password is less than 8 characters, or password does not contain a special character.",
                    });
            }

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
        res.status(500).json({ error: "Server error" });
    }
}





module.exports = {
    createUser
}