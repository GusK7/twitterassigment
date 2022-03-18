const express = require("express");
const loaders = require("./loaders");
require("dotenv").config({ path: "./.env" });

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, function () {
    console.log(`Listening to port ${process.env.PORT}`);
  });
}

startServer();

module.exports = startServer