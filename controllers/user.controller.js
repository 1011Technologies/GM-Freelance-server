const pool = require('../db');
const userService = require('../services/user.service');
const path = require('path');
const fs = require('fs').promises;
//USER EXISTING DATA
async function getUserDetail(req, res) {
    try {
        const userId = req.user;
        const userDetails = await userService.getUserDetail(userId);
        res.status(200).json(userDetails);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
}

//DELETE USER ACCOUNT
async function deleteAccount(req, res) {
    try {
        const { password } = req.body;
        const userId = req.user;

        const result = await userService.deleteAccount(userId, password);

        res.status(200).json(result);

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: error.message });
    }
}

//UPDATE PASSWORD
async function updatePassword(req, res) {
    try {
        const { current_password, new_password } = req.body;
        const userId = req.user;
        const result = await userService.updatePassword(userId, current_password, new_password);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: error.message });
    }
}

//UPLOAD PROFILE PICTURE
async function uploadProfilePicture(req, res) {
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ error: "File not provided" });
    }
    const userId = req.user;
    const fileName = req.file.filename;
    const imageUrl = `https://gmfree-server-644f0950f6dd.herokuapp.com/api/user/get-profile-picture/${fileName}`;
    try {
        const result = await userService.uploadProfilePicture(userId, fileName, imageUrl);
        res.json(result);
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Server error" });
    }
}

//GET USER PROFILE PICTURE ( NO FUNCTION IN USER>SERVICE FILE )
const getProfilePic = async (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '..', 'uploads', 'profilepicture', fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ error: "image not available" });
    }
};

//UPDATE USER DETAILS
async function updateDetail(req, res) {
    try {
        const userDetails = req.body;
        const userId = req.user;

        const result = await userService.updateDetail(userId, userDetails);
        res.status(200).json(result);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}

// SUBMIT REVIEW
async function submitReview(req, res) {
    try {
        const reviewDetails = req.body;
        const userId = req.user;

        const result = await userService.submitReview(userId, reviewDetails);
        res.status(200).json(result);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
}
module.exports = {
    getUserDetail,
    getProfilePic,
    deleteAccount,
    updatePassword,
    uploadProfilePicture,
    updateDetail,
    submitReview
}