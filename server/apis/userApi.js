/**
 * Created by eatong on 18-2-10.
 */
const {LogicError} = require("../framework/errors");
const userService = require('../services/userService');

module.exports = {
  addUser: async (ctx) => {
    return await userService.addUser(ctx.request.body);
  },
  updateUsers: async (ctx) => {
    return await userService.updateUsers(ctx.request.body);
  },
  deleteUsers: async (ctx) => {
    return await userService.deleteUsers(ctx.request.body.ids);
  },
  getUsers: async (ctx) => {
    return await userService.getUsers(ctx.request.body);
  },
  grantRole: async (ctx) => {
    return await userService.grantRole(ctx.request.body);
  },
  changePassword: async (ctx) => {
    const formData = ctx.request.body;
    formData.account = ctx.session.loginUser.account;
    return await userService.changePassword(formData);
  },
  login: async (ctx) => {
    const user = await userService.login(ctx.request.body);
    if (!user) {
      throw new LogicError('用户名或密码错误！');
    } else {
      ctx.session.loginUser = user;
      return user;
    }
  },
  logout: async (ctx) => {
    ctx.session.loginUser = null;
    return void 0;
  }
};

