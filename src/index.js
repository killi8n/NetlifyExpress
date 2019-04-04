const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.status(200).json({ success: true });
});

module.exports.handler = serverless(app);
