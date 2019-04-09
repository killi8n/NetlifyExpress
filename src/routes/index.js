const Router = require("koa-router");
const ssr = require("../ssr/render");

const router = new Router();

router.get("/", ssr);

module.exports = router;
