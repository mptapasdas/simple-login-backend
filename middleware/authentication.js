const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
    //check header

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Token cant be authenticated");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: payload.userId,
            name: payload.name,
            email: payload.email,
        };
        next();
    } catch (error) {
        throw new UnauthenticatedError("token error");
    }
};

module.exports = auth;
