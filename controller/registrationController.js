const pool = require('../db.js');
const createUser = async (req, res) => {
    try {
        const userDetail = req.body;
        const alreadyregistered = await pool.query(
            "SELECT * FROM users WHERE email = $1  AND password = $2 AND user_type=$3",
            [
                userDetail.email,
                userDetail.password,
                userDetail.user_type,
            ]
        );

        if (!alreadyregistered) {
            if (
                userDetail.password == userDetail.cpassword &&
                userDetail.password.length >= 8 &&
                /[!@#$%^&*(),.?":{}|<>]/g.test(userDetail.password)
            ) {
                const newUser = await pool.query(
                    "INSERT INTO users (first_name, last_name, user_name, email, password, user_type, city, town, street, house_no, postal_code, geom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, ST_MakePoint($12, $13))",
                    [
                        userDetail.first_name,
                        userDetail.last_name,
                        userDetail.user_name,
                        userDetail.email,
                        userDetail.password,
                        userDetail.user_type,
                        userDetail.city,
                        userDetail.town,
                        userDetail.street,
                        userDetail.house_no,
                        userDetail.postal_code,
                        userDetail.longitude,
                        userDetail.latitude,
                    ]
                );

                res.send("User registered successfully");
            } else {
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
        // Handle other errors, e.g., send an error response
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    createUser
}