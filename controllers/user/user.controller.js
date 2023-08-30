const pool = require('../../db');
const path = require('path');
const fs = require('fs').promises;

//USER EXISTING DATA
const getUserDetail = async (req, res) => {
    try {
        await pool.query('BEGIN');

        const result = await pool.query(
            'SELECT * FROM users WHERE user_id=$1',
            [req.user]
        );
        if (result.rows.length > 0) {
            const userDetails = result.rows[0];
            await pool.query('COMMIT');
            return res.status(200).json(userDetails);
        } else {
            await pool.query('ROLLBACK');
            return res.status(400).json({ error: 'User not found' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

//DELETE USER ACCOUNT
const deleteProfile = async (req, res) => {
    try {
        await pool.query('BEGIN');

        // Delete the user from the database
        await pool.query(
            'DELETE FROM users WHERE user_id=$1 RETURNING *',
            [req.user]
        );
        return res.status(404).json({ error: 'User Deleted Successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

//UPDATE PASSWORD
const updatePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;

        // Fetch the user's stored hashed password from the database
        const result = await pool.query("SELECT password FROM users WHERE user_id = $1", [req.user]);
        const storedHashedPassword = result.rows[0].password;

        // Check if the current password matches the stored password
        const isMatch = await bcrypt.compare(current_password, storedHashedPassword);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        // If the current password is correct, hash the new password and update it in the database
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(new_password, salt);

        await pool.query("BEGIN");
        await pool.query(
            "UPDATE users  SET password=$1 WHERE user_id = $2",
            [hashedPassword, req.user]
        );

        await pool.query('COMMIT');
        res.status(200).json({ success: true, message: 'Password updated successfully.' });

    } catch (error) {
        await pool.query('ROLLBACK');

        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

//UPLOAD PROFILE PICTURE
const uploadProfilePicture = async (req, res) => {
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ error: "File not provided" });
    }
    const fileName = req.file.filename;
    const imageUrl = `http://localhost:5000/api/users/get-profile-picture/${fileName}`;
    try {
        await pool.query("BEGIN");
        const oldPicResult = await pool.query(
            "SELECT profile_picture FROM users WHERE user_id = $1",
            [req.user]
        );
        const oldPicUrl = oldPicResult.rows[0]?.profile_picture;
        if (oldPicUrl != null) {
            const oldFileName = extractFilenameFromURL(oldPicUrl);
            if (oldFileName) {
                const oldFilePath = path.join(__dirname, '..', '..', 'uploads', 'profilepicture', oldFileName);
                fs.unlink(oldFilePath).catch(error => {
                    console.error("Error deleting old picture:", error);
                });
            }
        }
        await pool.query(
            "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
            [imageUrl, req.user]
        );
        await pool.query("COMMIT");
        res.json({
            fileName,
            imageUrl,
        });
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Server error" });
    }
};

function extractFilenameFromURL(url) {
    return url.split('/').pop();
}

//USER PROFILE PICTURE
const getProfilePic = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', '..', 'uploads', 'profilepicture', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "image not available" });
    }
};

//UPDATE USER DETAILS
const updateDetail = async (req, res) => {
    try {
        const { first_name, last_name, gender, phone_no, house_no, street, city, postal_code, state, country, longitude, latitude } = req.body;
        await pool.query("BEGIN");
        await pool.query(
            `UPDATE users 
            SET 
              first_name = $1, 
              last_name = $2, 
              gender = $3, 
              phone_no = $4, 
              city = $7, 
              state = $9, 
              street = $6, 
              house_no = $5, 
              postal_code = $8, 
              geom = POINT($11, $12),
              country=$10
            WHERE user_id = $13`,
            [first_name, last_name, gender, phone_no, house_no, street, city, postal_code, state, country, longitude, latitude, req.user]
        );


        await pool.query("COMMIT");
        res.status(200).json({ success: 'updated' });



    } catch (error) {
        await pool.query("ROLLBACK");

        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}


module.exports = { getUserDetail, getProfilePic, deleteProfile, updatePassword, uploadProfilePicture, updateDetail }