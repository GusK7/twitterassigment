const Bree = require("Bree");
const Graceful = require("@ladjs/graceful");
const server = require("http").createServer();
const io = require("socket.io")(server);
server.listen(3023);

async function loadJobs() {
  const bree = new Bree({
    jobs: [
      {
        name: "tweets",
        interval: "5m",
      },
      {
        name: "slacks",
        interval: "59m",
      },
    ],
    workerMessageHandler: (job) => {
      if (job && job.name == "tweets" && job.message == "done") {
        io.emit("tweets");
      }
    },
  });

  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();

  const connections = new Set();
  io.on("connection", function (s) {
    connections.add(s);
    s.once("disconnect", function () {
      connections.delete(s);
    });
  });

  return bree;
}

module.exports = loadJobs;
