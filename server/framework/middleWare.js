/**
 * Created by eatong on 17-12-28.
 */
const {ArgMissError, LogicError} = require('./errors');
const LogService = require('../services/LogService');
const whiteList = ['/api/user/login', '/api/user/loginByCode', '/api/user/bind'];

module.exports.checkArguments = (args) => {
  return async (ctx, next) => {
    if (args) {
      const bodyKeys = Object.keys(ctx.request.body);
      if (typeof args === 'string') {
        if (bodyKeys.indexOf(args) === -1) {
          throw(new ArgMissError(args));
        }
      } else {
        for (let arg of args) {
          if (bodyKeys.indexOf(arg) === -1) {
            throw(new ArgMissError(arg));
          }
        }
      }
    }
    return await next();
  }
};

module.exports.checkLogin = async (ctx, next) => {
  if (!/^\/api\/pub/.test(ctx.originalUrl) && whiteList.indexOf(ctx.originalUrl) === -1) {
    if (!ctx.session.loginUser) {
      ctx.status = 401;
      ctx.body = {success: false, data: {}, message: 'this api is not a shared api ,please login'};
      return;
    }
  }
  return await next();
};

module.exports.structureData = async (ctx, next) => {
  try {
    const data = await next();
    ctx.body = {success: true, data, message: ''};
  } catch (ex) {
    console.log(ex);
    if (ex instanceof ArgMissError) {
      ctx.status = 400;
      ctx.body = {success: false, data: {}, message: ex.message};
    } else if (ex instanceof LogicError) {
      ctx.status = 200;
      ctx.body = {success: false, data: {}, message: ex.message};

    } else {
      ctx.status = 500;
      ctx.body = {success: false, data: {}, message: ex.message};
    }
  }
};

module.exports.insertLog = (type) => {
  return async (ctx, next) => {
    const operator = ctx.session.loginUser ? ctx.session.loginUser.id : 0,
      url = ctx.originalUrl,
      req = JSON.stringify(ctx.request.body);
    await LogService.insertLog({operator, req, type, url});
    return await next();
  }
};
