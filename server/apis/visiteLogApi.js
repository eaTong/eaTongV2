
/**
 * Created by eaTong on 2019-10-31 .
 * Description: auto generated in  2019-10-31
 */

const {LogicError} = require("../framework/errors");
const visiteLogService = require('../services/visiteLogService');

module.exports = {
  addVisiteLog: async (ctx) => {
    return await visiteLogService.addVisiteLog(ctx.request.body);
  },
  updateVisiteLogs: async (ctx) => {
    return await visiteLogService.updateVisiteLogs(ctx.request.body);
  },
  deleteVisiteLogs: async (ctx) => {
    return await visiteLogService.deleteVisiteLogs(ctx.request.body.ids);
  },
  getVisiteLogs: async (ctx) => {
    return await visiteLogService.getVisiteLogs(ctx.request.body);
  },
  getVisiteLogDetail: async (ctx) => {
    return await visiteLogService.getVisiteLogDetail(ctx.request.body);
  }
};
  