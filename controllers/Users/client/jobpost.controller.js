const pool = require('../../../db');


const postJob = async (req, res) => {
    try {
        const { client_id, job_title, job_catagory, from_date, till_date, duration, description, budget } = req.body;

        if (rating && distance && response_rate && response_time && days_available && hourly_rate) {
            await pool.query('BEGIN');
            await pool.query(
                'INSERT INTO job (client_id, job_title, job_catagory, from_date, till_date, duration, description, budget) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)',
                [client_id, job_title, job_catagory, from_date, till_date, duration, description, budget]
            );
            await pool.query('COMMIT');

            res.status(200).json({ message: 'Job Posted' });
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
    postJob
}