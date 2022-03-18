const express = require("express");
const router = express.Router();
const tweetsService = require("../services/tweets.services")

router.get("/", async (req, res) => {
  try {
   const tweets = await tweetsService.getTweets();
    res.json(tweets
    );
  } catch (error) {}
});

module.exports = router
