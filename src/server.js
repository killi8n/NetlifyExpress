// const express = require("express");
const Koa = require("koa");
// const Router = require("koa-router");
const serve = require("koa-static");
const serverless = require("serverless-http");
// const bodyParser = require("body-parser");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const router = require("./routes");

const app = new Koa();
// const router = express.Router();
// const router = new Router();

// router.get("/", ctx => {
//   ctx.body = "HELLO!";
//   ctx.status = 200;
// });
router.use("/.netlify/functions/server", router.routes());

app.use(bodyParser());
// app.use(express.static(path.join(__dirname, "../build")));
app.use(serve(path.join(__dirname, "./build")));
// app.use("/.netlify/functions/server", router);
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
module.exports.handler = serverless(app);
