const express = require("express");
const router = express.Router();
const tweetsRouter = require("./tweet.route");

router.use("/tweets", tweetsRouter);

module.exports = router;
