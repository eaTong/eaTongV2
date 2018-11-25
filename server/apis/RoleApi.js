/**
 * Created by eatong on 18-2-10.
 */
const {LogicError} = require("../framework/errors");
const RoleService = require('../services/RoleService');
const BaseApi = require('../framework/BaseApi');


class RoleApi extends BaseApi {
  static async addRole(ctx) {
    return await RoleService.addRole(ctx.request.body);
  }

  static async updateRoles(ctx) {
    return await RoleService.updateRoles(ctx.request.body);
  }

  static async deleteRoles(ctx) {
    return await RoleService.deleteRoles(ctx.request.body.ids);
  }

  static async getRoles(ctx) {
    return await RoleService.getRoles(ctx.request.body);
  }

  static async grantMenus(ctx) {
    return await RoleService.grantMenus(ctx.request.body);
  }
}

module.exports = RoleApi;
