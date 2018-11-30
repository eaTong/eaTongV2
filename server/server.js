/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */

const Koa = require('koa');
const {createReadStream} = require('fs');
const next = require('next');
const Router = require('koa-router');
const koaBody = require('koa-body');
const koaConnect = require('koa-connect');
const compression = require('compression');
const cookie = require('koa-cookie').default;
const serve = require('koa-static');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const router = require('./routers');

const projectConfig = require('../config/project.config');
const serverConfig = require('../config/server.config');

// const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const port = dev ? projectConfig.devServerPort : projectConfig.productionServerPort;
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const app = new Koa();
    app.use(koaConnect(compression()));
// app.use(koaLogger());
    app.use(cookie());
    app.use(serve('dist'), {
      maxAge: 365 * 24 * 60 * 60,
      gzip: true
    });
    app.use(serve('adminDist'), {
      maxAge: 365 * 24 * 60 * 60,
      gzip: true
    });
    app.use(serve('assets'), {
      maxAge: 365 * 24 * 60 * 60,
      gzip: true
    });

    app.keys = ['key-for-eaTong'];
    app.use(session({
      store: new MysqlStore(serverConfig.mysql),
      rolling: true,
      cookie: {
        maxage: 24 * 60 * 60 * 1000
      }
    }));
//use koaBody to resolve data
    app.use(koaBody({multipart: true}));
//all routes just all API
    app.use(router.routes());

    router.get('/login', async ctx => {
      ctx.type = 'html';
      ctx.body = createReadStream('adminDist/index.html');
    });

    router.get('/admin/*', async ctx => {
      ctx.type = 'html';
      ctx.body = createReadStream('adminDist/index.html');
    });

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    app.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    app.use(router.routes());
    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    });
  });
