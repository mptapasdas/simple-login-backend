const { StatusCodes } = require("http-status-codes");

const verify = async (req, res) => {
    res.status(StatusCodes.OK).json({ verified: true });
};

module.exports = {
    verify,
};
