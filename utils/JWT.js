const { sign, verify } = require("jsonwebtoken");
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || "123456789abcdefghi";

const generateToken = (user_id) => {
    const payload = {
        user: user_id
    }
    const token = sign(payload, SECRET, { expiresIn: "20d" });
    return token;
};

const validateToken = (req, res, next) => {

    // try {
    //     const token = req.header("token")
    //     if (!token) {
    //         return res.status(403).json("Not Authorized")
    //     }
    //     const validToken = verify(token, SECRET);
    //     req.user = validToken.user;
    //     next() 

    // } catch (error) {
    //     return res.status(403).json("Not Authorized")

    // }

    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(403).json("Not Authorized");
        }
        const token = authHeader.split(' ')[1]; // Extract the token from the header
        const validToken = verify(token, SECRET);
        req.user = validToken.user;
        next();
    } catch (error) {
        return res.status(403).json("Not Authorized");
    }


}

module.exports = { generateToken, validateToken };
