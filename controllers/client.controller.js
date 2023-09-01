const pool = require('../db');

const updateClientData = async (req, res) => {
    try {
        const { rating, total_job_post, total_hires, company } = req.body;

        if (rating && total_job_post && total_hires && company) {
            const roundedRating = Math.round(rating);
            await pool.query('BEGIN');
            await pool.query(
                'UPDATE client SET rating = $2, total_job_post = $3, total_hires = $4, company = $5 WHERE user_id = $1',
                [req.user, roundedRating, total_job_post, total_hires, company]
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

const getClientData = async (req, res) => {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'Select * from client where user_id=$1',
            [req.user]
        );
        if (result.rows.length > 0) {
            const clientDetails = result.rows[0];
            await pool.query('COMMIT');
            return res.status(200).json(clientDetails);
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const postJob = async (req, res) => {
    try {
        const { client_id, job_title, job_category, duration, description, budget } = req.body;

        if (client_id && job_title && job_category && duration && description && budget) {
            await pool.query('BEGIN');
            await pool.query(
                'INSERT INTO job (client_id, job_title, job_category, duration, description, budget) VALUES ($1, $2, $3, $4, $5, $6)',
                [client_id, job_title, job_catagory, duration, description, budget]
            );
            await pool.query('COMMIT');

            res.status(200).json({ message: 'Job Posted' });
        } else {
            res.status(400).json({ error: 'Job cannot be posted.' });

        }
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    updateClientData, getClientData, postJob
}







