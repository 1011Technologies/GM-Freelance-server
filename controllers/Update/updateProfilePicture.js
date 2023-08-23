const pool = require('../../db');
const path = require('path');
const fs = require('fs').promises;


// const uploadProfilePicture = async (req, res) => {
//     try {
//         await pool.query("BEGIN");
//         await pool.query(
//             "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
//             [req.file.filename, req.user]
//         );
//         await pool.query("COMMIT");
//         const fileName = req.file.filename;
//         const imageUrl = `http://localhost:5000/api/users/getprofilepicture/${fileName}`;

//         res.json({
//             fileName,
//             imageUrl,  // The URL to view the uploaded image
//         });
//     } catch (error) {
//         await pool.query("ROLLBACK");

//         console.error(error.message);
//         res.status(500).json({ error: "Server error" });
//     }
// };

const uploadProfilePicture = async (req, res) => {
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ error: "File not provided" });
    }
    const fileName = req.file.filename;
    const imageUrl = `http://localhost:5000/api/users/getprofilepicture/${fileName}`;
    try {
        await pool.query("BEGIN");
        const oldPicResult = await pool.query(
            "SELECT profile_picture FROM users WHERE user_id = $1",
            [req.user]
        );
        const oldPicUrl = oldPicResult.rows[0]?.profile_picture;
        const oldFileName = extractFilenameFromURL(oldPicUrl);
        await pool.query(
            "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
            [imageUrl, req.user]
        );
        await pool.query("COMMIT");
        res.json({
            fileName,
            imageUrl,
        });
        if (oldFileName) {
            const oldFilePath = path.join(__dirname, '..', '..', 'uploads', oldFileName);
            fs.unlink(oldFilePath).catch(error => {
                console.error("Error deleting old picture:", error);
            });
        }
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Server error" });
    }
};
function extractFilenameFromURL(url) {
    return url.split('/').pop();
}


module.exports = {
    uploadProfilePicture
}



const url = "http://10.0.0.65:5000/get-file/uploads/1692006757503_wp2700080-computer-science-engineering-wallpapers.jpg";
const filename = extractFilenameFromURL(url);