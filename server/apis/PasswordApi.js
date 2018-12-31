
/**
 * Created by eaTong on 2018-30-11 .
 * Description: auto generated in  2018-30-11
 */

const {LogicError} = require("../framework/errors");
const PasswordService = require('../services/PasswordService');
const BaseApi = require('../framework/BaseApi');


class PasswordApi extends BaseApi {
  static async addPassword(ctx) {
    return await PasswordService.addPassword(ctx.request.body);
  }

  static async updatePasswords(ctx) {
    return await PasswordService.updatePasswords(ctx.request.body);
  }

  static async deletePasswords(ctx) {
    return await PasswordService.deletePasswords(ctx.request.body.ids);
  }

  static async getPasswords(ctx) {
    return await PasswordService.getPasswords(ctx.request.body);
  }

  static async getPasswordDetail(ctx) {
    return await PasswordService.getPasswordDetail(ctx.request.body);
  }

}

module.exports = PasswordApi;
