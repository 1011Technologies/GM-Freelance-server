// AUTHENTICATION
const authService = require('../services/auth.service');

//LOGIN
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
}
//SIGN UP
async function createUser(req, res) {
    try {
        const userDetail = req.body;
        const result = await authService.register(userDetail);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    loginUser,
    createUser
};
