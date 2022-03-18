const Tweet = require("../models/tweet.model");

class TweetsService {
  static async getTweets() {
    try {
     const tweets = await Tweet.find();
      return tweets;
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = TweetsService;
