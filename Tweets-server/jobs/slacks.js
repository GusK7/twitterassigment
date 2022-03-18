const axios = require("axios");
const Tweet = require("./../models/tweet.model");
const mongoose = require("mongoose");
const { IncomingWebhook } = require("@slack/webhook");
const { parentPort } = require("worker_threads"); 


mongoose
  .connect(process.env.DATABASE_URL)
  .then(async (v) => {
    let pastHourDateTime = new Date();
    pastHourDateTime.setDate(pastHourDateTime.getHours() - 1);
    pastHourDateTime.setSeconds(0, 0);
    const pastHourTweets = await Tweet.find({
      createdAt: { $gt: pastHourDateTime },
    });
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
    let header = [];
    header.push({
      type: "header",
      text: {
        type: "plain_text",
        text: `New Tweets posted from hour ${pastHourDateTime.getHours()}:00`,
      },
    });
    await webhook.send({
      text: "Tweets Slacked",
      blocks: header,
    });
    let slackBlocks = [];
    for (const data of pastHourTweets) {
      slackBlocks.push({
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `New Tweet :bird:`,
          },
          {
            type: "plain_text",
            text: data.tweet,
          },
        ],
      });
      data.slacked = true;
      await data.save();
    }
    await webhook.send({
      text: "Tweets Slacked",
      blocks: slackBlocks,
    });

    console.log("Slack notification sent.");
   parentPort.postMessage('done')
  process.exit(0);
  })    
  .catch((e) => {
    console.error(e);
  });
