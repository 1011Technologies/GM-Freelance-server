const pool = require('../db');

// GET FREELANCER BY TOKEN 
async function getFreelancerDataByUserId(userId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            `SELECT * FROM freelancer 
            Inner join certification on freelancer.freelancer_id = certification.freelancer_id 
            Inner join skill on skill.freelancer_id = certification.freelancer_id 
            WHERE freelancer.user_id=$1`,
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
            'select * from users inner join client on users.user_id = client.user_id  WHERE client_id=$1',
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
        const result = await pool.query('SELECT * FROM users inner join client on users.user_id = client.user_id ');
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

// UPDATE PASSWORD
async function updateData(userId, freelancerDetails) {
    try {
        await pool.query('BEGIN');
        await pool.query(
            "UPDATE freelancer SET days_available=$2, hourly_rate=$3, title=$4, overview=$5 WHERE user_id = $1",
            [userId, freelancerDetails.days_available, freelancerDetails.hourly_rate, freelancerDetails.title, freelancerDetails.overview]
        );

        await pool.query('COMMIT');
        return { success: true, message: 'Details updated successfully.' };

    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// ADD CERTIFICATION OF FREELANCER
async function addCertificate(userId, certified_in, certification_link, provider) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT freelancer_id FROM freelancer WHERE user_id=$1',
            [userId]
        );
        await pool.query(
            "UPDATE certification SET certified_in=$2, certification_link=$3, provider=$4 where freelancer_id=$1",
            [result.rows[0].freelancer_id, certified_in, certification_link, provider]
        );

        await pool.query('COMMIT');
        return { success: true, message: 'Certification updated successfully.' };

    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// ADD SKILL OF FREELANCER
async function addSkill(userId, skill_1, skill_2, skill_3, skill_4, skill_5) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT freelancer_id FROM freelancer WHERE user_id=$1',
            [userId]
        );
        await pool.query(
            `INSERT INTO skill ( freelancer_id, skill_1, skill_2, skill_3, skill_4, skill_5 ) VALUES ($1, $2, $3, $4, $5, $6)`,
            [result.rows[0].freelancer_id, skill_1, skill_2, skill_3, skill_4, skill_5]
        );

        await pool.query('COMMIT');
        return { success: true, message: 'All skills added.' };

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
    getProposalByJobId,
    updateData,
    addCertificate,
    addSkill
};