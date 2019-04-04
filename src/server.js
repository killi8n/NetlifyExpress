const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ status: "Hello" });
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router);

module.exports = app;
module.exports.handler = serverless(app);
