const pool = require('../db');

// GET FREELANCER BY TOKEN 
async function getFreelancerDataByUserId(userId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM freelancer WHERE user_id=$1',
            [userId]
        );
        if (result.rows.length > 0) {
            const freelancerDetails = result.rows[0];
            await pool.query('COMMIT');
            return freelancerDetails;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// SUBMIT PROPOSAL
async function submitProposal(freelancerId, jobId, proposedDuration, proposedPrice, coverLetter, attachmentUrl) {
    try {
        await pool.query('BEGIN');
        const proposalSubmitted = await pool.query(
            'SELECT * FROM proposal WHERE job_id = $2 AND freelancer_id = $1',
            [freelancerId, jobId]
        );

        if (proposalSubmitted.rows.length === 0) {
            await pool.query(
                'INSERT INTO proposal (freelancer_id, job_id, proposed_duration, proposed_price, cover_letter, attachment) VALUES ($1, $2, $3, $4, $5, $6)',
                [freelancerId, jobId, proposedDuration, proposedPrice, coverLetter, attachmentUrl]
            );
            await pool.query('COMMIT');
            return { message: 'Proposal Submitted' };
        } else {
            return { message: 'Already Submitted' };
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL JOBS
async function getJobs() {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM job'
        );

        if (result.rows.length > 0) {
            const jobs = result.rows;
            await pool.query('COMMIT');
            return jobs;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET JOB BY SPECIFIC ID
async function getJobById(jobId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM job WHERE job_id=$1',
            [jobId]
        );
        if (result.rows.length > 0) {
            const job = result.rows[0];
            await pool.query('COMMIT');
            return job;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET CLIENT BY SPECIFIC ID
async function getClientById(clientId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM client WHERE client_id=$1',
            [clientId]
        );
        if (result.rows.length > 0) {
            const client = result.rows[0];
            await pool.query('COMMIT');
            return client;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL CLIENTS
async function getClients() {
    try {
        await pool.query('BEGIN');
        const result = await pool.query('SELECT * FROM client');
        await pool.query('COMMIT');
        return result.rows;
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL JOB THAT FREELANCER HAVE APPLIED FOR
async function getAppliedJobsByUserId(userId) {
    try {
        const freelancerDetails = await pool.query(
            'SELECT freelancer_id FROM freelancer WHERE user_id = $1',
            [userId]
        );

        if (freelancerDetails.rows.length === 0) {
            return { message: 'User is not a freelancer' };
        }

        const freelancerId = freelancerDetails.rows[0].freelancer_id;

        const result = await pool.query(
            `SELECT * FROM job j
             FULL JOIN proposal p ON j.job_id = p.job_id
             WHERE p.freelancer_id = $1`,
            [freelancerId]
        );

        const appliedJobs = result.rows;

        if (appliedJobs.length > 0) {
            return appliedJobs;
        } else {
            return { message: 'No applied jobs found' };
        }
    } catch (error) {
        throw error;
    }
}

// GET ALL PROPOSALS BY USER ID
async function getProposalsByUserId(userId) {
    try {
        const freelancerDetails = await pool.query(
            'SELECT freelancer_id FROM freelancer WHERE user_id = $1',
            [userId]
        );

        if (freelancerDetails.rows.length === 0) {
            return { message: 'User is not a freelancer' };
        }

        const freelancerId = freelancerDetails.rows[0].freelancer_id;

        const result = await pool.query(
            'SELECT * FROM proposal WHERE freelancer_id = $1',
            [freelancerId]
        );

        const proposals = result.rows;

        if (proposals.length > 0) {
            return proposals;
        } else {
            return { message: 'No proposals found' };
        }
    } catch (error) {
        throw error;
    }
}

// GET PROPOSAL BY JOB ID
async function getProposalByJobId(jobId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM proposal WHERE job_id = $1',
            [jobId]
        );

        if (result.rows.length > 0) {
            const proposal = result.rows[0];
            await pool.query('COMMIT');
            return proposal;
        } else {
            await pool.query('ROLLBACK');
            return { message: 'Proposal not found' };
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

module.exports = {
    getFreelancerDataByUserId,
    submitProposal,
    getJobs,
    getJobById,
    getClientById,
    getClients,
    getAppliedJobsByUserId,
    getProposalsByUserId,
    getProposalByJobId
};