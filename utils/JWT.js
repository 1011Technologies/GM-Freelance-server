const { sign, verify } = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "123456789abcdefghi"; 

const generateToken = (user) => {
    const token = sign({ email: user.email, id: user.user_id }, SECRET);
    return token;
};

const validateToken = (req, res, next) => {
    const token = req.cookies["access-token"];
    if (!token) {
        return res.status(400).json({ error: "User not Authenticated" });
    }
    try {
        const validToken = verify(token, SECRET);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { generateToken, validateToken };
