/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */

const Koa = require('koa');
const {createReadStream} = require('fs');
const next = require('next');
const Router = require('koa-router');
const projectConfig = require('../config/project.config');

// const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const port = dev ? projectConfig.devServerPort : projectConfig.productionServerPort;
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();


    router.get('/admin', async ctx => {
      ctx.type = 'html';
      ctx.body = createReadStream('adminDist/console.html');
    });

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes());
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    });
  });
