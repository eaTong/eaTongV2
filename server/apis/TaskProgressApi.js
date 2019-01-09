
/**
 * Created by eaTong on 2018-25-11 .
 * Description: auto generated in  2018-25-11
 */

const {LogicError} = require("../framework/errors");
const TaskProgressService = require('../services/TaskProgressService');
const BaseApi = require('../framework/BaseApi');


class TaskProgressApi extends BaseApi {
  static async addTaskProgress(ctx) {
    return await TaskProgressService.addTaskProgress(ctx.request.body);
  }

  static async updateTaskProgress(ctx) {
    return await TaskProgressService.updateTaskProgress(ctx.request.body);
  }

  static async deleteTaskProgress(ctx) {
    return await TaskProgressService.deleteTaskProgress(ctx.request.body.ids);
  }

  static async getTaskProgressByTask(ctx) {
    return await TaskProgressService.getTaskProgressByTask(ctx.request.body);
  }
  static async getTaskProgress(ctx) {
    return await TaskProgressService.getTaskProgress(ctx.request.body);
  }

  static async getTaskProgressDetail(ctx) {
    return await TaskProgressService.getTaskProgressDetail(ctx.request.body);
  }

}

module.exports = TaskProgressApi;
