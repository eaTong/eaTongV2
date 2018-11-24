/**
 * Created by eatong on 18-2-10.
 */
const {LogicError} = require("../framework/errors");
const UserService = require('../services/UserService');
const BaseApi = require('../framework/BaseApi');


class UserApi extends BaseApi {
  static async addUser(ctx) {
    return await UserService.addUser(ctx.request.body);
  }

  static async updateUsers(ctx) {
    return await UserService.updateUsers(ctx.request.body);
  }

  static async deleteUsers(ctx) {
    return await UserService.deleteUsers(ctx.request.body.ids);
  }

  static async getUsers(ctx) {
    return await UserService.getUsers(ctx.request.body);
  }

  static async grantRole(ctx) {
    return await UserService.grantRole(ctx.request.body);
  }

  static async login(ctx) {
    const user = await UserService.login(ctx.request.body);
    if (!user) {
      throw new LogicError('用户名或密码错误！');
    } else {
      ctx.session.loginUser = user;
      return user;
    }
  }

  static async loginByCode(ctx) {
    const result = await UserService.loginByCode(ctx.request.body.code);
    if (!result.openid) {
      throw new LogicError('获取openid失败');
    }
    if (result.user) {
      ctx.session.loginUser = result.user;
    }
    ctx.session.openid = result.openid;
    return result;
  }

  static async bindUser(ctx) {
    const openid = ctx.session.openid;
    console.log(openid);
    const user = await UserService.bindUser({...ctx.request.body, openid});
    if (!user) {
      throw new LogicError('用户名或密码错误！');
    } else {
      ctx.session.loginUser = user;
      return user;
    }
  }

  static async logout(ctx) {
    ctx.session.loginUser = null;
    return void 0;
  }
}

module.exports = UserApi;
