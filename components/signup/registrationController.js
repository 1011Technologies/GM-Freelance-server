const pool = require('../../db');
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
        if (alreadyregistered.rowCount==0) {
            
            if (
                userDetail.password == userDetail.cpassword &&
                userDetail.password.length >= 8 &&
                /[!@#$%^&*(),.?":{}|<>]/g.test(userDetail.password)
            ) {
                const newUser = await pool.query(
                    "INSERT INTO users (first_name, last_name, email, password, user_type) VALUES ($1, $2, $3, $4, $5)",
                    [
                        userDetail.first_name,
                        userDetail.last_name,
                        userDetail.email,
                        userDetail.password,
                        userDetail.user_type,
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