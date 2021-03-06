const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
        },
        token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    //find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Can not find the user");
    }

    //compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("wrong password");
    }

    //create JWT from user model
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
        },
        token,
    });
};

module.exports = {
    register,
    login,
};
