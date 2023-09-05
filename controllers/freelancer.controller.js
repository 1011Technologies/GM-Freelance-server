const pool = require('../db');
const getFreelancerData = async (req, res) => {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'Select * from freelancer where user_id=$1',
            [req.user]
        );
        if (result.rows.length > 0) {
            const freelancerDetails = result.rows[0];
            await pool.query('COMMIT');
            return res.status(200).json(freelancerDetails);
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const submitProposal = async (req, res) => {
    try {
        if (!req.file || !req.file.filename) {
            return res.status(400).json({ error: "File not provided" });
        }
        const fileName = req.file.filename;

        const { freelancer_id, job_id, proposed_duration, proposed_price, cover_letter } = req.body;
        const attachmentUrl = `https://gmfree-server-644f0950f6dd.herokuapp.com/api/user/get-profile-picture/${fileName}`
        if (freelancer_id && job_id && proposed_duration && proposed_price && cover_letter) {
            await pool.query('BEGIN');
            await pool.query(
                `INSERT INTO proposal (freelancer_id, job_id,proposed_duration, proposed_price, cover_letter, attachment) VALUES ($1, $2, $3, $4, $5, $6);`,
                [freelancer_id, job_id, proposed_duration, proposed_price, cover_letter, attachmentUrl]
            );
            await pool.query('COMMIT');
            res.status(200).json({ message: 'Proposal Submitted' });
        } else {
            res.status(400).json({ error: 'Proposel Submission declined.' });
        }

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }

};

module.exports = {
    getFreelancerData, submitProposal
}