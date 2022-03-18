const middleware = require("./middleware");
const loadJobs = require("./jobs");
const dbConnectionWithRetry = require('./mongoose');

async function runInitializers({ expressApp }) {

  await middleware({ app: expressApp });
  console.log("Express Initialized");

  await dbConnectionWithRetry();
  console.log("Connection to DB initialized");

  const jobs = await loadJobs();
  jobs.start();
  console.log("Jobs Started");


}

module.exports = runInitializers;