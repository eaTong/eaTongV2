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
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const queryString = require('query-string');
const router = require('./routers');
const routes = require('../page-routes');
require('./framework/schedule');
const visiteService = require("./services/visiteLogService");

const projectConfig = require('../config/project.config');
const serverConfig = require('../config/server.config');

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? projectConfig.devServerPort : projectConfig.productionServerPort;
const nextServer = next({dev});

nextServer.prepare()
  .then(() => {
    const app = new Koa();
    app.use(koaConnect(compression()));
    app.use(cookie());
    app.use(koaLogger());
//use koaBody to resolve data
    app.use(koaBody({multipart: true}));

    app.use(async (ctx, next) => {
      if (ctx.request.method === 'GET' && /.*\?/.test(ctx.request.url)) {
        ctx.request.body = queryString.parse(ctx.request.url.replace(/.*\?/, ''));
      }
      await next();
    });

    app.use(serve('.next/server/static', {
      maxAge: 365 * 24 * 60 * 60,
      gzip: true,
      hidden: true
    }));
    app.use(serve('adminDist', {
      maxAge: 365 * 24 * 60 * 60,
      gzip: true,
      hidden: true
    }));
    app.use(serve('assets', {
      maxAge: 365 * 24 * 60 * 60,
      gzip: true,
      hidden: true
    }));

    app.keys = ['key-for-eaTong'];
    app.use(session({
      store: new MysqlStore(serverConfig.mysql),
      rolling: true,
      cookie: {
        maxage: 24 * 60 * 60 * 1000
      }
    }));
    router.all('*', async (ctx, next) => {
      const time = new Date().getTime();
      await next();
      const visitPath = ctx.originalUrl;
      if (!/(\.js(\.map)?)|(\.(png)|(jgp)|(gif))/.test(visitPath.toLowerCase())) {
        await visiteService.addVisiteLog({
          path: visitPath,
          time: new Date().getTime() - time,
          userAgent: ctx.req.headers['user-agent'],
          ip: getClientIP(ctx.req),
          method: ctx.req.method,
          status: ctx.res.statusCode
        });
      }
    });
    router.get('/login', async ctx => {
      ctx.type = 'html';
      ctx.body = createReadStream('adminDist/admin.html');
    });

    router.get('/demo-*', async ctx => {
      ctx.type = 'html';
      ctx.body = createReadStream('adminDist/admin.html');
    });

    router.get('/admin*', async ctx => {
      ctx.type = 'html';
      ctx.body = createReadStream('adminDist/admin.html');
    });

    app.use(router.routes());
    const handler = routes.getRequestHandler(nextServer);
    app.use(ctx => {
      ctx.respond = false;
      ctx.res.statusCode = 200; // because koa defaults to 404
      handler(ctx.req, ctx.res)
    });

    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    });
  });

function getClientIP(req) {
  return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress;
};
