const pool = require('../db');

// UPDATE CLIENT DATA 
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

// GET CLIENT DATA 
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

// POST JOB
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

// GET ALL FREELANCERS
async function getFreelancers() {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            'SELECT * FROM users  inner join freelancer on users.user_id = freelancer.user_id'
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

// GET FREELANCER BY SPECIFIC ID
async function getFreelancerById(freelancerId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            `SELECT * FROM users  
            inner join freelancer on users.user_id = freelancer.user_id
            left join certification on freelancer.freelancer_id = certification.freelancer_id
            left join skill on certification.freelancer_id = skill.freelancer_id
            WHERE freelancer.freelancer_id=$1`,
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

// ADD BOOKMARK TO SAVE FREELANCER
async function addBookmark(freelancer_id, client_id) {
    try {
        await pool.query(
            "INSERT INTO bookmark (client_id, freelancer_id) VALUES($1,$2)",
            [client_id, freelancer_id]
        )
        await pool.query('COMMIT');
        return { message: 'Bookmark added successfully' };
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// DELETE BOOKMARK TO DELETE FREELANCER
async function deleteBookmark(freelancer_id, client_id) {
    try {
        await pool.query(
            "DELETE FROM bookmark WHERE client_id=$1 AND freelancer_id=$2",
            [client_id, freelancer_id]
        )
        await pool.query('COMMIT');
        return { message: 'Bookmark removed successfully' };
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

//GET ALL BOOKMARKS 
async function getBookmarks(user_id) {
    try {
        await pool.query('BEGIN');
        const client = await pool.query(
            'SELECT client_id FROM client WHERE user_id=$1',
            [user_id]
        );
        if (client) {
            const result = await pool.query(
                'SELECT * FROM bookmark WHERE client_id=$1',
                [client.rows[0].client_id]
            );

            if (result.rows.length > 0) {
                const bookmarks = result.rows;
                await pool.query('COMMIT');
                return bookmarks;
            }
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// ADD RECENTLY VIEWED FREELANCER ( LIMIT 10 )
async function addRecentViews(freelancer_id, user_id) {
    try {
        await pool.query('BEGIN');
        const getclient = await pool.query(
            'SELECT client_id FROM client  WHERE user_id = $1',
            [user_id]
        );

        const freelancerAdded = await pool.query(
            'SELECT client_id,freelancer_id FROM recently_viewed  WHERE client_id = $1 AND freelancer_id=$2',
            [getclient.rows[0].client_id, freelancer_id]
        );
        if (!freelancerAdded && freelancerAdded.rows == 0) {
            const rowCount = await pool.query(
                'SELECT CAST(COUNT(*) AS INTEGER) FROM recently_viewed WHERE client_id = $1',
                [getclient.rows[0].client_id]
            );

            const rowCountInt = rowCount.rows[0].count;
            if (rowCountInt >= 5) {
                const deleteQuery = `
                         DELETE FROM recently_viewed
                         WHERE recently_viewed_id = (
                             SELECT recently_viewed_id
                             FROM recently_viewed
                             WHERE client_id = $1
                             ORDER BY time_added ASC
                             LIMIT 1
                         );`
                await pool.query(deleteQuery, [getclient.rows[0].client_id]);
            }
            await pool.query(
                'INSERT INTO recently_viewed (client_id, freelancer_id) VALUES($1, $2)',
                [getclient.rows[0].client_id, freelancer_id]
            );

            await pool.query('COMMIT');
            return { message: 'Added in recent' };
        }
        else {
            return { message: 'Already in recent' };
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL RECENTLY VIEWED FREELANCERS
async function getRecentlyViewed(userId) {
    try {
        await pool.query('BEGIN');
        const getclient = await pool.query(
            'SELECT client_id FROM client  WHERE user_id = $1',
            [userId]
        );

        const result = await pool.query(
            `SELECT users.first_name,users.last_name,users.profile_picture,users.geom ,users.is_verified ,freelancer.freelancer_id ,freelancer.rating,freelancer.reviews_count,freelancer.response_rate,freelancer.response_time ,freelancer.days_available,freelancer.hourly_rate  
            FROM recently_viewed 
            inner join freelancer on freelancer.freelancer_id=recently_viewed.freelancer_id
            inner join users  on freelancer.user_id =users.user_id 
            WHERE recently_viewed.client_id=$1`,
            [getclient.rows[0].client_id]
        );

        if (result.rows.length > 0) {
            const recentlyViewed = result.rows;
            await pool.query('COMMIT');
            return recentlyViewed;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL THE FREELANCERS THAT ARE BOOKMARKED
async function getBookmarkedFreelancers(user_id) {
    try {
        await pool.query('BEGIN');
        const client = await pool.query(
            'SELECT client_id FROM client WHERE user_id=$1',
            [user_id]
        );
        if (client) {
            const result = await pool.query(
                `SELECT * 
            FROM users 
            LEFT JOIN freelancer ON users.user_id  = freelancer.user_id 
            LEFT JOIN bookmark ON freelancer.freelancer_id  = bookmark.freelancer_id 
            WHERE bookmark.client_id =$1`,
                [client.rows[0].client_id]
            );

            if (result.rows.length > 0) {
                const bookmarkedFreelancer = result.rows;
                await pool.query('COMMIT');
                return bookmarkedFreelancer;
            }
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET FREELANCERS WITH RATING MORE THEN 4.85
async function getRisingStars() {
    try {
        await pool.query('BEGIN');
        const risingStars = await pool.query(
            `SELECT users.first_name,users.last_name,users.profile_picture,users.geom ,users.is_verified ,freelancer.freelancer_id ,freelancer.rating,freelancer.reviews_count,freelancer.response_rate,freelancer.response_time ,freelancer.days_available,freelancer.hourly_rate FROM freelancer
            inner join users on users.user_id =freelancer.user_id 
            WHERE freelancer.rating >= 4.85`,
        );
        if (risingStars.rows.length > 0) {
            const allStars = risingStars.rows;
            await pool.query('COMMIT');
            return allStars;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET FREELANCERS THAT CLIENT HIRED
async function getYourHires(userId) {
    try {
        await pool.query('BEGIN');
        const getclient = await pool.query(
            'SELECT client_id FROM client WHERE user_id = $1',
            [userId]
        );
        const getAllHires = await pool.query(
            `SELECT users.first_name, users.last_name, users.profile_picture, users.geom, users.is_verified, freelancer.freelancer_id, freelancer.rating, freelancer.reviews_count, freelancer.response_rate, freelancer.response_time, freelancer.days_available, freelancer.hourly_rate 
            FROM freelancer
            INNER JOIN users ON users.user_id = freelancer.user_id
            INNER JOIN project ON project.freelancer_id = freelancer.freelancer_id
            WHERE project.client_id = $1;`,
            [getclient.rows[0].client_id],
        );
        if (getAllHires.rows.length > 0) {
            const allHires = getAllHires.rows;
            await pool.query('COMMIT');
            return allHires;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL JOBS POSTED BY CLIENT
async function getMyJobs(userId) {
    try {
        await pool.query('BEGIN');
        const getclient = await pool.query(
            'SELECT client_id FROM client WHERE user_id = $1',
            [userId]
        );
        const getAllJobs = await pool.query(
            `SELECT * FROM job
            WHERE job.client_id = $1;`,
            [getclient.rows[0].client_id],
        );
        if (getAllJobs.rows.length > 0) {
            const allJobs = getAllJobs.rows;
            await pool.query('COMMIT');
            return allJobs;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET JOB BY ID
async function getJob(jobId) {
    try {
        await pool.query('BEGIN');
        const getJob = await pool.query(
            `SELECT * FROM job
            WHERE job.job_id = $1;`,
            [jobId],
        );
        if (getJob.rows.length > 0) {
            const job = getJob.rows[0];
            await pool.query('COMMIT');
            return job;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL PROPOSALS FOR A JOB
async function getJobProposals(jobId) {
    try {
        await pool.query('BEGIN');
        const getAllProposals = await pool.query(
            `SELECT * FROM proposal
            WHERE proposal.job_id = $1;`,
            [jobId],
        );
        if (getAllProposals.rows.length > 0) {
            const allProposals = getAllProposals.rows;
            await pool.query('COMMIT');
            return allProposals;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET A PROPOSAL BY ID
async function getProposal(proposalId) {
    try {
        await pool.query('BEGIN');
        const getProposal = await pool.query(
            `SELECT * FROM proposal
            WHERE proposal.proposal_id = $1;`,
            [proposalId],
        );
        if (getProposal.rows.length > 0) {
            const proposal = getProposal.rows[0];
            await pool.query('COMMIT');
            return proposal;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// Accept a proposal
async function acceptProposal(proposalId, userId) {
    try {
        await pool.query('BEGIN');
        const client = await pool.query(
            'SELECT client_id FROM client WHERE user_id=$1',
            [userId]
        );

        const result = await pool.query(
            `SELECT proposal.freelancer_id, proposal.proposed_price, proposal.proposed_duration, job.job_title, job.description, proposal.proposal_status from proposal
            INNER JOIN job on job.job_id=proposal.job_id
            where proposal.proposal_id=$1`,
            [proposalId]
        );
        const days = result.rows[0].proposed_duration;
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        const endTime = currentDate.toISOString().slice(0, 23);
        if (result.rows[0].proposal_status === 'submitted') {
            await pool.query(
                `UPDATE proposal
                SET proposal_status = 'accepted'
                WHERE proposal_id = $1;`,
                [proposalId],
            );

            await pool.query(
                `INSERT INTO project (proposal_id, freelancer_id, client_id, end_time, project_price, project_duration, project_title, project_description)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [proposalId, result.rows[0].freelancer_id, client.rows[0].client_id, endTime, result.rows[0].proposed_price, result.rows[0].proposed_duration, result.rows[0].job_title, result.rows[0].description]
            );

            const projectId = await pool.query(
                `SELECT project_id FROM project
                WHERE proposal_id = $1`,
                [proposalId]
            );
            
            await pool.query('COMMIT');
            return { message: 'Proposal accepted successfully', projectId: projectId.rows[0].project_id};
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// Reject a proposal
async function rejectProposal(proposalId) {
    try {
        await pool.query('BEGIN');
        const rejectProposal = await pool.query(
            `UPDATE proposal
            SET proposal_status = 'rejected'
            WHERE proposal.proposal_id = $1;`,
            [proposalId],
        );
        await pool.query('COMMIT');
        return { message: 'Proposal rejected successfully' };
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET ALL PROJECTS
async function getProjects(userId) {
    try {
        await pool.query('BEGIN');
        const client = await pool.query(
            'SELECT client_id FROM client WHERE user_id=$1',
            [userId]
        );

        const result = await pool.query(
            `SELECT * FROM project
            WHERE project.client_id = $1;`,
            [client.rows[0].client_id],
        );

        if (result.rows.length > 0) {
            const projects = result.rows;
            await pool.query('COMMIT');
            return projects;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

// GET PROJECT BY SPECIFIC ID
async function getProjectById(projectId) {
    try {
        await pool.query('BEGIN');
        const result = await pool.query(
            `SELECT * FROM project
            WHERE project.project_id = $1;`,
            [projectId],
        );
        if (result.rows.length > 0) {
            const project = result.rows[0];
            await pool.query('COMMIT');
            return project;
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}
module.exports = {
    updateClientData,
    getClientData,
    postJob,
    getFreelancers,
    getFreelancerById,
    addBookmark,
    deleteBookmark,
    getBookmarks,
    getBookmarkedFreelancers,
    getRecentlyViewed,
    getBookmarkedFreelancers,
    addRecentViews,
    getRisingStars,
    getYourHires,
    getMyJobs,
    getJob,
    getJobProposals,
    getProposal,
    acceptProposal,
    rejectProposal,
    getProjects,
    getProjectById,
};