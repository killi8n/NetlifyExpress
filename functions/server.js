const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyParser");
const serverless = require("serverless-http");
const ssr = require("./ssr/render");
const app = new Koa();
const router = new Router();

app.use(bodyParser());
// app.use(bodyParser.urlencoded({ extended: false }));

const routerBasePath =
  process.env.NODE_ENV === "dev" ? `/` : `/.netlify/functions/server/`;

router.get(routerBasePath, ssr);
// router.get('/')
// app.get(, ssr);
app.use(router.routes()).use(router.allowedMethods());
app.use(ssr);

module.exports.handler = serverless(app);
