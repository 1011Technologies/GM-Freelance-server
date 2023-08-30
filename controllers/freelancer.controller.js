const pool = require('../db');


const getFreelancerData = async (req, res) => {
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

module.exports = {
    getFreelancerData
}