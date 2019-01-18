
/**
 * Created by eaTong on 2019-01-18 .
 * Description: auto generated in  2019-01-18
 */

const {LogicError} = require("../framework/errors");
const BugService = require('../services/BugService');
const BaseApi = require('../framework/BaseApi');


class BugApi extends BaseApi {
  static async addBug(ctx) {
    return await BugService.addBug(ctx.request.body);
  }

  static async updateBugs(ctx) {
    return await BugService.updateBugs(ctx.request.body);
  }

  static async deleteBugs(ctx) {
    return await BugService.deleteBugs(ctx.request.body.ids);
  }

  static async getBugs(ctx) {
    return await BugService.getBugs(ctx.request.body);
  }

  static async getBugDetail(ctx) {
    return await BugService.getBugDetail(ctx.request.body);
  }

}

module.exports = BugApi;
  