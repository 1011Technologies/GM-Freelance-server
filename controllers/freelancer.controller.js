const path = require("path");
const fs = require('fs').promises;
const freelancerService = require('../services/freelancer.service');


// GET FREELANCER BY TOKEN 
async function getFreelancerData(req, res) {
    try {
        const userId = req.user;
        const freelancerDetails = await freelancerService.getFreelancerDataByUserId(userId);
        res.status(200).json(freelancerDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// SUBMIT PROPOSAL
async function submitProposal(req, res) {
    try {
        const fileName = req.file?.filename;
        const attachmentUrl = fileName ? `https://gmfree-server-644f0950f6dd.herokuapp.com/api/freelancer/get-attachment-file/${fileName}` : null;
        const { freelancer_id, job_id, proposed_duration, proposed_price, cover_letter } = req.body;

        if (freelancer_id && job_id && proposed_duration && proposed_price && cover_letter) {
            const result = await freelancerService.submitProposal(freelancer_id, job_id, proposed_duration, proposed_price, cover_letter, attachmentUrl);
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: 'Proposal Submission declined.' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// USER ATTACHMENT FILE ( NO FUNCTION IN SERVICE FILE )
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

// GET ALL JOBS
async function getJobs(req, res) {
    try {
        const jobs = await freelancerService.getJobs();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET JOB BY SPECIFIC ID
async function getJob(req, res) {
    try {
        const jobId = req.params.jobId;
        const job = await freelancerService.getJobById(jobId);
        res.status(200).json(job);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET CLIENT BY SPECIFIC ID
async function getClient(req, res) {
    try {
        const clientId = req.params.clientId;
        const client = await freelancerService.getClientById(clientId);
        res.status(200).json(client);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET ALL CLIENTS
async function getClients(req, res) {
    try {
        const clients = await freelancerService.getClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET ALL JOB THAT FREELANCER HAVE APPLIED FOR
async function getAppliedJobs(req, res) {
    try {
        const userId = req.user;
        const appliedJobs = await freelancerService.getAppliedJobsByUserId(userId);
        if (appliedJobs.message) {
            res.status(400).json(appliedJobs);
        } else {
            res.status(200).json(appliedJobs);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET ALL PROPOSALS BY USER ID
async function getProposals(req, res) {
    try {
        const userId = req.user;
        const proposals = await freelancerService.getProposalsByUserId(userId);

        if (proposals.message) {
            res.status(400).json(proposals);
        } else {
            res.status(200).json(proposals);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET PROPOSAL BY JOB ID
async function getProposal(req, res) {
    try {
        const jobId = req.params.jobId;
        const proposal = await freelancerService.getProposalByJobId(jobId);

        if (proposal.message) {
            res.status(404).json(proposal);
        } else {
            res.status(200).json(proposal);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}


//UPDATE USER DETAILS
async function updateData(req, res) {
    try {
        const freelancerDetails = req.body;
        const userId = req.user;

        const result = await freelancerService.updateData(userId, freelancerDetails);
        res.status(200).json(result);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}

// ADD CERTIFICATION OF FREELANCER
async function addCertificate(req, res) {
    try {
        const {certified_in, certification_link} = req.body;
        const userId = req.user;

        const result = await freelancerService.addCertificate(userId, certified_in, certification_link);
        res.status(200).json(result);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}
module.exports = {
    getFreelancerData,
    submitProposal,
    getAttachmentFile,
    getJobs,
    getJob,
    getClient,
    getClients,
    getAppliedJobs,
    getProposals,
    getProposal,
    updateData,
    addCertificate
}