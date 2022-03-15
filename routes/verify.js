const express = require("express");

const router = express.Router();

const { verify } = require("../controllers/verify");

router.route("/").get(verify);

module.exports = router;
