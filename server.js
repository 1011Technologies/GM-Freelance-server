// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const pool = require('./db.js');
// import workoutRoutes from './routes/workouts';

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

app.post("/signup", async (req, res) => {
    try {
        const userDetail = req.body;
        // console.log(userDetail.coordinates);

        if (userDetail.password == userDetail.cpassword) {
            const pointValue =ST_MakePoint(userDetail.longitude, userDetail.latitude);
            console.log(pointValue);

            const newUser = await pool.query("INSERT INTO users (first_name, last_name, user_name, email, password, user_type, city, town, street, house_no, postal_code, coordinates) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
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
                    pointValue
                ]
            );

            // Handle the response, e.g., send a success message
            res.send("User registered successfully");
        } else {
            // Handle password mismatch error, e.g., send an error response
            res.status(400).json({ error: "Password and confirm password do not match" });
        }
    } catch (err) {
        console.error(err.message);
        // Handle other errors, e.g., send an error response
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
