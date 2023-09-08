const pool = require('../db');

//UPDATE CLIENT DATA 
async function updateClientData(userId, rating, totalJobPost, totalHires, company) {
    try {
        if (rating && totalJobPost && totalHires && company) {
            const roundedRating = Math.round(rating);
            await pool.query('BEGIN');
            await pool.query(
                'UPDATE client SET rating = $2, total_job_post = $3, total_hires = $4, company = $5 WHERE user_id = $1',
                [userId, roundedRating, totalJobPost, totalHires, company]
            );
            await pool.query('COMMIT');

            return { message: 'Client detail inserted' };
        } else {
            throw new Error('Enter correct details');
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

//GET CLIENT DATA 
async function getClientData(userId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM client WHERE user_id=$1',
            [userId]
        );

        if (result.rows.length > 0) {
            const clientDetails = result.rows[0];
            await pool.query('COMMIT');
            return clientDetails;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

//POST JOB
async function postJob(clientId, jobTitle, jobCategory, duration, description, budget) {
    try {
        await pool.query('BEGIN');
        await pool.query(
            'INSERT INTO job (client_id, job_title, job_category, duration, description, budget) VALUES ($1, $2, $3, $4, $5, $6)',
            [clientId, jobTitle, jobCategory, duration, description, budget]
        );
        await pool.query('COMMIT');
        return { message: 'Job Posted' };
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

//GET ALL FREELANCERS
async function getFreelancers() {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM freelancer'
        );

        if (result.rows.length > 0) {
            const freelancers = result.rows;
            await pool.query('COMMIT');
            return freelancers;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

//GET FREELANCER BY SPECIFIC ID
async function getFreelancerById(freelancerId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM freelancer WHERE freelancer_id=$1',
            [freelancerId]
        );
        if (result.rows.length > 0) {
            const freelancer = result.rows[0];
            await pool.query('COMMIT');
            return freelancer;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

module.exports = {
    updateClientData, getClientData, postJob, getFreelancers, getFreelancerById
};