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

// ADD BOOKMARK TO SAVE FREELANCER
async function addBookmark(req, res) {
    try {
        const { freelancer_id } = req.body
        const client_id = req.user
        const add = await clientService.addBookmark(freelancer_id, client_id)
        res.status(200).json(add)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}


// DELETE BOOKMARK TO DELETE FREELANCER
async function deleteBookmark(req, res) {
    try {
        const { freelancer_id } = req.body
        const client_id = req.user
        const add = await clientService.deleteBookmark(freelancer_id, client_id)
        res.status(200).json(add)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

//GET ALL BOOKMARKS 
async function getBookmarks(req, res) {
    try {
        user_id = req.user
        const freelancers = await clientService.getBookmarks(user_id);
        res.status(200).json(freelancers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}


// ADD RECENTLY VIEWED FREELANCER ( LIMIT 10 )
async function addRecentView(req, res) {
    try {
        const { freelancer_id } = req.body
        const user_id = req.user
        const add = await clientService.addRecentViews(freelancer_id, user_id)
        res.status(200).json(add)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET CLIENT DATA BY TOKEN
async function getRecent(req, res) {
    try {
        const userId = req.user;
        const clientDetails = await clientService.getRecentlyViewed(userId);
        res.status(200).json(clientDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}


// GET ALL THE FREELANCERS THAT ARE BOOKMARKED
async function getBookmarkedFreelancers(req, res) {
    try {
        client_id = req.user
        const bookmarkedFreelancer = await clientService.getBookmarkedFreelancers(user_id);
        res.status(200).json(bookmarkedFreelancer);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}


// GET FREELANCERS WITH RATING MORE THEN 4.85
async function getRisingStars(req, res) {
    try {
        const clientDetails = await clientService.getRisingStars();
        res.status(200).json(clientDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET FREELANCERS THAT CLIENT HIRED
async function getYourHires(req, res) {
    try {
        const userId = req.user;
        const clientDetails = await clientService.getYourHires(userId);
        res.status(200).json(clientDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    updateClientData,
    getClientData,
    postJob,
    getFreelancers,
    getFreelancer,
    addBookmark,
    deleteBookmark,
    getBookmarks,
    getBookmarkedFreelancers,
    addRecentView,
    getRecent,
    getRisingStars,
    getYourHires
}







