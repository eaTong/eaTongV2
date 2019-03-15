
/**
 * Created by eaTong on 2019-03-15 .
 * Description: auto generated in  2019-03-15
 */

const {LogicError} = require("../framework/errors");
const bugService = require('../services/bugService');

module.exports = {
  addBug: async (ctx) => {
    return await bugService.addBug(ctx.request.body);
  },
  updateBugs: async (ctx) => {
    return await bugService.updateBugs(ctx.request.body);
  },
  deleteBugs: async (ctx) => {
    return await bugService.deleteBugs(ctx.request.body.ids);
  },
  getBugs: async (ctx) => {
    return await bugService.getBugs(ctx.request.body);
  },
  getBugDetail: async (ctx) => {
    return await bugService.getBugDetail(ctx.request.body);
  }
};
  