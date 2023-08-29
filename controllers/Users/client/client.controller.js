const pool = require('../../../db');

const saveClientData = async (req, res) => {
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

module.exports = {
    saveClientData, getClientData
}







