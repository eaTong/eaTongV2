/**
 * Created by eatong on 18-2-10.
 */
const roleService = require('../services/roleService');

module.exports = {
  addRole: async (ctx) => {
    return await roleService.addRole(ctx.request.body);
  },

  updateRoles: async (ctx) => {
    return await roleService.updateRoles(ctx.request.body);
  },

  deleteRoles: async (ctx) => {
    return await roleService.deleteRoles(ctx.request.body.ids);
  },

  getRoles: async (ctx) => {
    return await roleService.getRoles(ctx.request.body);
  },

  grantMenus: async (ctx) => {
    return await roleService.grantMenus(ctx.request.body);
  }
};
