const pool = require('../db');
const path = require("path");
const fs = require('fs').promises;


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
        const fileName = req.file?.filename;
        const attachmentUrl = fileName ? `https://gmfree-server-644f0950f6dd.herokuapp.com/api/freelancer/get-attachment-file/${fileName}` : null;
        const { freelancer_id, job_id, proposed_duration, proposed_price, cover_letter } = req.body;
        if (freelancer_id && job_id && proposed_duration && proposed_price && cover_letter) {
            await pool.query('BEGIN');
            await pool.query(
                `INSERT INTO proposal (freelancer_id, job_id, proposed_duration, proposed_price, cover_letter, attachment) VALUES ($1, $2, $3, $4, $5, $6);`,
                [freelancer_id, job_id, proposed_duration, proposed_price, cover_letter, attachmentUrl]
            );
            await pool.query('COMMIT');
            res.status(200).json({ message: 'Proposal Submitted' });
        } else {
            res.status(400).json({ error: 'Proposal Submission declined.' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

//USER ATTACHMENT FILE
const getAttachmentFile = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', 'uploads', 'proposal', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "No document exists" });
    }
};

const getJobs = async (req, res) => {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'Select * from job'
        );
        if (result.rows.length > 0) {
            const jobs = result.rows;
            await pool.query('COMMIT');
            return res.status(200).json(jobs);
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const getJob = async (req, res) => {
    try {
        const job_id = req.params.jobId;
        await pool.query('BEGIN');
        const result = await pool.query(
            'Select * from job where job_id=$1',
            [job_id]
        );
        if (result.rows.length > 0) {
            const job = result.rows[0];
            await pool.query('COMMIT');
            return res.status(200).json(job);
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


const getClient = async (req, res) => {
    try {
        const client_id = req.params.clientId;
        await pool.query('BEGIN');
        const result = await pool.query(
            'Select * from client where client_id=$1',
            [client_id]
        );
        if (result.rows.length > 0) {
            const client = result.rows[0];
            await pool.query('COMMIT');
            return res.status(200).json(client);
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const getClients = async (req, res) => {
    try {
        await pool.query('BEGIN');
        const result = await pool.query('SELECT * FROM client');
        if (result.rows.length > 0) {
            const clients = result.rows;
            await pool.query('COMMIT');
            return res.status(200).json(clients);
        } else {
            await pool.query('COMMIT');
            return res.status(200)
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const getAppliedJobs = async (req, res) => {
    try {
        const freelancerDetails = await pool.query(
            "SELECT freelancer_id FROM freelancer WHERE user_id = $1",
            [req.user]
        );

        if (freelancerDetails.rows.length === 0) {
            return res.status(400).json({ message: 'User is not a freelancer' });
        }
        const freelancerId = freelancerDetails.rows[0].freelancer_id;
        const result = await pool.query(
            `SELECT * FROM job j
             FULL JOIN proposal p on j.job_id = p.job_id
             WHERE p.freelancer_id = $1`,
            [freelancerId]
        );
        const appliedJobs = result.rows;
        if (appliedJobs.length > 0) {
            return res.status(200).json(appliedJobs);
        } else {
            return res.status(400).json({ message: 'No applied jobs found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    getFreelancerData, submitProposal, getAttachmentFile, getJobs, getJob, getClient, getClients, getAppliedJobs
}