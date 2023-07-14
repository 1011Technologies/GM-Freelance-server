

const logoutUser = async (req, res) => {
    req.session.destroy();

    res.send("Logged out");
}

module.exports = {
    logoutUser
}