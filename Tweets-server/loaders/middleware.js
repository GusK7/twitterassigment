const cors = require("cors");
const express = require("express");

const apiRouter = require("./../routes/index");
const corsSettings = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: false,
};

async function middleware({ app }) {
  app.use(cors(corsSettings));
  app.options("*", cors(corsSettings));
  app.use(express.json());
  app.use("/", apiRouter);
}

module.exports = middleware;
