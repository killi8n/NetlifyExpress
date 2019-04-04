const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ status: 200 });
});

app.use(bodyParser.json());
app.use("/", router);
// app.get("/", (req, res) => {
//   return res.status(200).json({ success: true });
// });

module.exports = app;
module.exports.handler = serverless(app);
