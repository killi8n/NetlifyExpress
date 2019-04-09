const Router = require("koa-router");

const router = new Router();

router.get("/", ctx => {
  ctx.body = "HELLLOOO";
  ctx.status = 200;
});

module.exports = router;
