const pool = require('../../db');
const bcrypt = require('bcrypt');

const freelancerData = async (req, res) => {
    try {
        const { rating, distance, response_rate, response_time, days_available, hourly_rate } = req.body;

        if (rating && distance && response_rate && response_time && days_available && hourly_rate) {
            const sessionUserId = req.session.user.user_id;

            await pool.query('BEGIN');
            await pool.query(
                'INSERT INTO freelancer (user_id, rating, distance, response_rate, response_time, days_available, hourly_rate) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [sessionUserId, rating, distance, response_rate, response_time, days_available, hourly_rate]
            );
            await pool.query('COMMIT');

            res.status(200).json({ message: 'Freelancer detail inserted' });
        } else {
            res.status(400).json({ error: 'Enter correct details' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};






const clientData = async (req, res) => {
    try {
        const { rating, total_job_post, total_hires, company } = req.body;

        if (rating && total_job_post && total_hires && company) {
            const sessionUserId = req.session.user.user_id;
            const roundedRating = Math.round(rating);

            await pool.query('BEGIN');
            await pool.query(
                'INSERT INTO client (user_id, rating, total_job_post, total_hires, company) VALUES ($1, $2, $3, $4, $5)',
                [sessionUserId, roundedRating, total_job_post, total_hires, company]
            );
            await pool.query('COMMIT');

            res.status(200).json({ message: 'Client detail inserted' });
        } else {
            res.status(400).json({ error: 'Enter correct details' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};






const uploadProfilePicture = async (req, res) => {
    try {
        await pool.query("BEGIN");
        await pool.query(
            "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
            [req.file.filename, req.user]
        );
        await pool.query("COMMIT");
        const fileName = req.file.filename;
        const imageUrl = `http://localhost:5000/pic/${fileName}`;

        res.json({
            fileName,
            imageUrl,  // The URL to view the uploaded image
        });
    } catch (error) {
        await pool.query("ROLLBACK");

        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};


const updateDetail = async (req, res) => {
    try {
        const { first_name, last_name, gender, phone_no, house_no, street, city, state, postal_code, country, longitude, latitude } = req.body;
        await pool.query("BEGIN");
        await pool.query(
            `UPDATE users 
            SET 
              first_name = $1, 
              last_name = $2, 
              gender = $3, 
              phone_no = $4, 
              city = $7, 
              state = $8, 
              street = $6, 
              house_no = $5, 
              postal_code = $9, 
              geom = POINT($11, $12)
              country=$10
            WHERE user_id = $13`,
            [first_name, last_name, gender, phone_no, house_no, street, city, state, postal_code, country, longitude, latitude, req.user]
        );


        await pool.query("COMMIT");
        res.status(200).json({ success: 'updated' });



    } catch (error) {
        await pool.query("ROLLBACK");

        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    freelancerData, clientData, uploadProfilePicture, updateDetail
} 







