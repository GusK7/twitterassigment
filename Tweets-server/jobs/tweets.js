const axios = require("axios");
const Tweet = require("./../models/tweet.model");
const mongoose = require("mongoose");
const { parentPort } = require("worker_threads"); 

const config = {
  headers: { Authorization: `Bearer ${process.env.TWITTER_TOKEN}` },
};

mongoose
  .connect(process.env.DATABASE_URL)
  .then(async (v) => {
    let date = new Date();
    date.setDate(date.getMinutes() - 5);
    date.setSeconds(0, 0);
    date = date.toISOString();
    let twitterApi = process.env.TWITTER_API + date;
    const tweetsCollection = await axios
      .get(twitterApi, config)
      .then((res) => res.data.data);
    if (!tweetsCollection) {
      process.exit(0);
      return;
    }
    const tweets = [];
    for (const tweet of tweetsCollection) {
      const tweetItem = {
        tweet: tweet.text,
        slacked: false,
      };
      tweets.push(tweetItem);
    }
    await Tweet.insertMany(tweets);
    await mongoose.disconnect();
    console.info("Bree Mongo Tweet disconnected !");
    parentPort.postMessage('done')
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
  });
