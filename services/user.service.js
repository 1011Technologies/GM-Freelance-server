const pool = require('../db');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;

//GET USER DATA
async function getUserDetail(userId) {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE user_id=$1',
            [userId]
        );

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
}

//DELETE ACCOUNT
async function deleteAccount(userId, password) {
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [userId]
        );

        if (user.rows.length === 0) {
            throw new Error('User not found.');
        }

        const passwordMatch = await checkPassword(password, user.rows[0].password);

        if (!passwordMatch) {
            throw new Error('Incorrect password.');
        }

        const deleteResult = await pool.query(
            'DELETE FROM users WHERE user_id = $1',
            [userId]
        );

        if (deleteResult.rowCount === 0) {
            throw new Error('User not found or already deleted.');
        }

        return { success: true, message: 'Account deleted successfully.' };

    } catch (error) {
        throw error;
    }
}
async function checkPassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

//UPDATE PASSWORD
async function updatePassword(userId, currentPassword, newPassword) {
    try {
        const result = await pool.query("SELECT password FROM users WHERE user_id = $1", [userId]);
        const storedHashedPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(currentPassword, storedHashedPassword);
        if (!isMatch) {
            throw new Error('Current password is incorrect.');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await pool.query('BEGIN');
        await pool.query(
            "UPDATE users SET password=$1 WHERE user_id = $2",
            [hashedPassword, userId]
        );

        await pool.query('COMMIT');
        return { success: true, message: 'Password updated successfully.' };

    } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
}

//UPLOAD PROFILE PICTURE
async function uploadProfilePicture(userId, fileName, imageUrl) {
    try {
        await pool.query("BEGIN");
        const oldPicResult = await pool.query(
            "SELECT profile_picture FROM users WHERE user_id = $1",
            [userId]
        );
        const oldPicUrl = oldPicResult.rows[0]?.profile_picture;
        if (oldPicUrl != null) {
            const oldFileName = extractFilenameFromURL(oldPicUrl);
            if (oldFileName) {
                const oldFilePath = path.join(__dirname, '..', 'uploads', 'profilepicture', oldFileName);
                fs.unlink(oldFilePath).catch(error => {
                    console.error("Error deleting old picture:", error);
                });
            }
        }
        await pool.query(
            "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
            [imageUrl, userId]
        );
        await pool.query("COMMIT");
        return {
            fileName,
            imageUrl,
        };
    } catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
}
function extractFilenameFromURL(url) {
    return url.split('/').pop();
}

//UPDATE USER DETAILS
async function updateDetail(userId, userDetails) {
    try {
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
            [
                userDetails.first_name,
                userDetails.last_name,
                userDetails.gender,
                userDetails.phone_no,
                userDetails.house_no,
                userDetails.street,
                userDetails.city,
                userDetails.postal_code,
                userDetails.state,
                userDetails.country,
                userDetails.longitude,
                userDetails.latitude,
                userId
            ]
        );

        await pool.query("COMMIT");
        return { success: 'updated' };

    } catch (error) {
        await pool.query("ROLLBACK");
        throw error;
    }
}

module.exports = {
    getUserDetail, deleteAccount, updatePassword, uploadProfilePicture, updateDetail
};