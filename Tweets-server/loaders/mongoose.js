const mongoose = require("mongoose");

const dbConnectWithRetry = () => {
  return mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected.");
    })
    .catch((error) => {
      console.log("error", error);
      setTimeout(dbConnectWithRetry, 5000);
    });
};

module.exports = dbConnectWithRetry;
