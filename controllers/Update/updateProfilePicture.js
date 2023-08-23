const pool = require('../../db');


const uploadProfilePicture = async (req, res) => {
    try {
        await pool.query("BEGIN");
        await pool.query(
            "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
            [req.file.filename, req.user]
        );
        await pool.query("COMMIT");
        const fileName = req.file.filename;
        const imageUrl = `http://localhost:5000/api/users/getprofilepicture/${fileName}`;

        res.json({
            fileName,
            imageUrl,  // The URL to view the uploaded image
        });
    } catch (error) {
        await pool.query("ROLLBACK");

        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = {
    uploadProfilePicture
} 
