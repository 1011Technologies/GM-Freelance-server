const clientService = require('../services/client.service');

//UPDATE CLIENT DATA
async function updateClientData(req, res) {
    try {
        const { rating, total_job_post, total_hires, company } = req.body;
        const userId = req.user;

        const result = await clientService.updateClientData(userId, rating, total_job_post, total_hires, company);
        res.status(200).json(result);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET CLIENT DATA BY TOKEN
async function getClientData(req, res) {
    try {
        const userId = req.user;
        const clientDetails = await clientService.getClientData(userId);
        res.status(200).json(clientDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// POST JOB 
async function postJob(req, res) {
    try {
        const { client_id, job_title, job_category, duration, description, budget } = req.body;
        if (client_id && job_title && job_category && duration && description && budget) {
            const result = await clientService.postJob(client_id, job_title, job_category, duration, description, budget);
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: 'Job cannot be posted.' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

//GET ALL FREELANCERS
async function getFreelancers(req, res) {
    try {
        const freelancers = await clientService.getFreelancers();
        res.status(200).json(freelancers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

//GET FREELANCER BY SPECIFIC ID
async function getFreelancer(req, res) {
    try {
        const freelancerId = req.params.freelancerId;
        const freelancer = await clientService.getFreelancerById(freelancerId);
        res.status(200).json(freelancer);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    updateClientData, getClientData, postJob, getFreelancers, getFreelancer
}







