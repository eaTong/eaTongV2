
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {LogicError} = require("../framework/errors");
const passwordService = require('../services/passwordService');

module.exports = {
  addPassword: async (ctx) => {
    return await passwordService.addPassword(ctx.request.body);
  },
  updatePasswords: async (ctx) => {
    return await passwordService.updatePasswords(ctx.request.body);
  },
  deletePasswords: async (ctx) => {
    return await passwordService.deletePasswords(ctx.request.body.ids);
  },
  getPasswords: async (ctx) => {
    return await passwordService.getPasswords(ctx.request.body);
  },
  getPasswordDetail: async (ctx) => {
    return await passwordService.getPasswordDetail(ctx.request.body);
  }
};
  