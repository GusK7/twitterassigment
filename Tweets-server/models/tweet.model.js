const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    tweet: String,
    slacked: Boolean,
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", schema);
module.exports = Tweet;
